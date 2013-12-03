var spotify = require('./spotify/spotify')( {
	appkeyFile: './spotify_appkey.key'
});

spotify.ready(function() {
	var playlists;
	playlists = spotify.getPlaylists();


	var filteredPlaylists = [];

	for (var i = 0; i < playlists.length; i++) {
		if (playlists[i].name.length > 0) {
			filteredPlaylists.push(playlists[i]);
		}
	}

	//console.log(filteredPlaylists[0]);


	var search = new spotify.Search('Lady Gaga – A Very Gaga Holiday');
	search.execute(function (error, searchResult) {
		console.log(searchResult);
		var playlistResult = searchResult.playlists[0];
		var track = playlistResult.getTracks()[0];

		spotify.player.play(track);
	});

/*	playlist.on('playlist_renamed', function(err, playlist) {
		console.log(playlist.name);
	});*/

/*	playlists.on('playlist_tracks_added', function(err, tracks) {
		console.log(tracks);
	});*/
	//console.log(playlists)
});


spotify.login('aaronfaber', '23!Arsakia1089', true, false);