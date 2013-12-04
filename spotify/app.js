var spotify = require('./spotify/spotify')( {
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
		console.log(searchResult);
		var playlistResult = searchResult.playlists[0];
		var track = playlistResult.getTracks()[0];

		spotify.player.play(track);
	});
});

spotify.login(login.user.name, login.user.password, true, false);