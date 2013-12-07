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
			console.log(query);

			spotify.search(query.term, function (error, xml) {
				if (error) {
					throw error;
				}

				var parser = new xml2js.Parser();

				parser.on('end', function (data) {
					console.log(data.result.playlists[0].playlist);
				});

				parser.parseString(xml);
			});
		});
	}
};

module.exports = SpotifyWrapper;