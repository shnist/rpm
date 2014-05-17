var spotify = require('node-spotify')({
		appkeyFile: 'spotify_appkey.key'
	}),
	Q = require('q'),
	deferred = Q.defer();

var spotifyInterface = {
	login: function (credentials) {
		spotify.login(credentials.username, credentials.password, false, false);
		
		spotify.ready(function () {
			deferred.resolve({
				status: 200
			});
		});
	},

	search: function () {

	},

	play: function () {

	}
};

module.exports = spotifyInterface;











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