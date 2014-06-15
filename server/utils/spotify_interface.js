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

	search: function () {

	},

	play: function () {

	}
};











function searchSpotify () {
	var search = new spotify.Search('Lady Gaga – A Very Gaga Holiday');
	search.execute(function (error, searchResult) {
	    //console.log(searchResult);
	    var playlistResult = searchResult.playlists[0];
	    var track = playlistResult.getTracks()[0];

	    spotify.player.play(track);
	    spotify.player.seek(track.duration - 4);

	    spotify.player.on('player_end_of_track', function (error, player) {
	    	
	    });
	});
}