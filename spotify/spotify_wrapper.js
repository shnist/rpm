var SpotifyPlayer = require('spotify-web');
var SpotifyCredentials = require('./spotify_login');
var pubsub = require('node-pubsub');
var xml2js = require('xml2js');


var self;
var SpotifyWrapper = {
	context: {
		connected: false
	},
	loginCallback: function () {},
	searchCallback: function () {},

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

		console.log(data.result);
		for (var j = 0; j < data.result.albums[0].album.length; j++) {
			/*var album = {
				uri: data.result.albums[0].album[j].uri.toString(),
				name: data.result.albums[0].album[j].name.toString()
			};*/

			//albums.push(album);
		}

		combinedAlbumsPlaylists.playlists = playlists;
		combinedAlbumsPlaylists.albums = albums;

		this.searchCallback(combinedAlbumsPlaylists);
	}
};

module.exports = SpotifyWrapper;