var SpotifyPlayer = require('spotify-web');
var SpotifyCredentials = require('./spotify_login');
var pubsub = require('node-pubsub');
var xml2js = require('xml2js');
var lame = require('lame');
var Speaker = require('speaker');

var self;
var SpotifyWrapper = {
	context: {
		connected: false
	},
	loginCallback: function () {},
	searchCallback: function () {},
	playCallback: function () {},

	init: function () {
		self = this;
		this.subscriptions();
	},
	subscriptions: function () {
		pubsub.subscribe('spotify:result', function (result) {
			this.searchCallback(result);
		});
	},
	login: function (username, password, callback) {
		var user = username || SpotifyCredentials.username,
			secret = password || SpotifyCredentials.password;

		this.loginCallback = callback;

		SpotifyPlayer.login(user, secret, this.spotifyContext);
	},
	isLoggedIn: function () {
		return this.context.connected;
	},
	getUserName: function () {
		return 'aaronfaber';
	},
	search: function (query, callback) {
		this.searchCallback = callback;

		pubsub.publish('spotify:search', [{term: query}]);
	},
	spotifyContext: function (error, spotify) {
		self.context = spotify;

		if (error) {
			self.loginCallback(true, {
				error: error
			});
		} else {
			self.loginCallback(false, {
				connected: spotify.connected,
				username: spotify.username
			});
		}

		pubsub.subscribe('spotify:search', function (query) {
			spotify.search(query.term, function (error, xml) {
				if (error) {
					throw error;
				}

				var parser = new xml2js.Parser();

				parser.on('end', function (data) {
					self.processSearchResults(data);
				});

				parser.parseString(xml);
			});
		});
	},
	processSearchResults: function (data) {
		var combinedAlbumsPlaylists = {};
		var playlists = [];
		var albums = [];

		for (var i = 0; i < data.result.playlists[0].playlist.length; i++) {
			var playlist = {
				uri: data.result.playlists[0].playlist[i].uri.toString(),
				name: data.result.playlists[0].playlist[i].name.toString()
			};

			playlists.push(playlist);
		}

		for (var j = 0; j < data.result.albums[0].album.length; j++) {
			if (data.result.albums[0].album[j]['album-type'].toString() === 'album') {
				console.log(data.result.albums[0].album[j]);

				var album = {
					name: data.result.albums[0].album[j].name.toString(),
					artist: data.result.albums[0].album[j]['artist-name'].toString(),
					uri: SpotifyPlayer.gid2uri('album', data.result.albums[0].album[j].id.toString()),
				};

				albums.push(album);
			}
		}

		combinedAlbumsPlaylists.playlists = playlists;
		combinedAlbumsPlaylists.albums = albums;

		this.searchCallback(combinedAlbumsPlaylists);
	},
	processPlayRequest: function (uri, callback) {
		this.playCallback = callback;

		this.determineUriType(uri, this.play);
	},
	determineUriType: function (uri, callback) {
		var type = SpotifyPlayer.uriType(uri);
		if (type !== 'album' && type !== 'playlist') {
			this.playCallback({
				'status': 'error',
				'error': {
					'message': 'Unrecognised uri type. Was not album or playlist'
				}
			});
		} else {
			if (type === 'album') {
				this.playAlbum(uri);
			} else {
				this.playPlaylist(uri);
			}
		}
	},
	playAlbum: function (uri) {
		this.context.get('spotify:album:7u6zL7kqpgLPISZYXNTgYk', function (error, album) {
			if (error) {
				throw error;
			}
			// first get the Track instances for each disc
			var tracks = [];
			album.disc.forEach(function (disc) {
				if (!Array.isArray(disc.track)) return;

				tracks.push.apply(tracks, disc.track);
			});

			function next () {
				var track = tracks.shift();
				if (!track) return spotify.disconnect();

				track.get(function (err) {
					if (err) throw err;

					self.playCallback({
						artist: track.artist[0].name,
						track: track.name
					});

					//console.log('Playing: %s - %s', track.artist[0].name, track.name);

					track.play().on('error', function (err) {
						console.error(err.stack || err);
						next();
					})
					.pipe(new lame.Decoder())
					.pipe(new Speaker())
					.on('finish', next);
				});
			}

			next();
		});
	},
	playPlaylist: function (uri) {
		this.context.playlist(uri, function (err, playlist) {
			if (err) throw err;

			var tracks = [];

			playlist.contents.items.forEach(function (track) {
				tracks.push(track);
			});

			function next () {
				var track = tracks.shift();
				if (!track) return spotify.disconnect();

				self.context.get(track.uri, function (err, track) {
					console.log(track);

					if (err) throw err;

					self.playCallback({
						artist: track.artist[0].name,
						track: track.name
					});

					//console.log('Playing: %s - %s', track.artist[0].name, track.name);

					track.play().on('error', function (err) {
						console.error(err.stack || err);
						next();
					})
					.pipe(new lame.Decoder())
					.pipe(new Speaker())
					.on('finish', next);
				});
			}

			next();
		});
	}
};

module.exports = SpotifyWrapper;