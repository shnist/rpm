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
	}
};