var spotify = require('./lib_spotify/spotify')( {
	appkeyFile: './spotify_appkey.key'
});

var login = require('./spotify_login');

spotify.ready(function() {
	var playlists;
	playlists = spotify.getPlaylists();


	var filteredPlaylists = [];

	for (var i = 0; i < playlists.length; i++) {
		if (playlists[i].name.length > 0) {
			filteredPlaylists.push(playlists[i]);
		}
	}

	var search = new spotify.Search('Lady Gaga – A Very Gaga Holiday');
	search.execute(function (error, searchResult) {
		//console.log(searchResult);
		var playlistResult = searchResult.playlists[0];
		var track = playlistResult.getTracks()[0];

		spotify.player.on('player_end_of_track', function (error, player) {
			console.log(player, error);
		});
		spotify.player.play(track);
		spotify.player.seek(track.duration - 4);

	});


});

spotify.login(login.user.name, login.user.password, true, false);