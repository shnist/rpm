var spotifyInterface = {


	login: function () {
		
	}



};

module.exports = spotifyInterface;








var spotifyOptions = {
	appkeyFile: 'spotify_appkey.key'
};

var spotify = require('node-spotify')(spotifyOptions);

spotify.login('aaron.jack.faber@gmail.com', '23Arsakia1089', false, false);

spotify.ready(function () {
	searchSpotify();
});


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