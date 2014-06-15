var spotify = require('node-spotify')({
	appkeyFile: './server/utils/spotify_appkey.key'
});

module.exports = {
	login: function (credentials, callback) {
		spotify.ready(function (error) {
			callback(error);
		});

		spotify.login(credentials.username, credentials.password, true, false);
	},

	search: function (query, callback) {
		var search = new spotify.Search(query);

		search.execute(function (error, searchResult) {
			callback(error, searchResult);
		});
	},

	getPlaylists: function (callback) {
		var playlistContainer = spotify.playlistContainer,
			playlists = playlistContainer.getPlaylists(),
			retrievablePlaylists = playlists.filter(function (element) {
				return element.hasOwnProperty('link');
			});

		callback(null, retrievablePlaylists);
	},

	getPlaylistById: function (id, callback) {
		var playlistContainer = spotify.playlistContainer,
			playlists = playlistContainer.getPlaylists(),
			matchingPlaylist = playlists.filter(function (element) {
				var playlistId;

				if (!element.hasOwnProperty('link')) {
					return false;
				} 

				playlistId = element.link.split(':')[4];

				return playlistId === id;
			});

		callback(null, matchingPlaylist);
	}
};