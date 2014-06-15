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
		var playlist = this._getPlaylistById(id);

		callback(null, playlist);
	},

	getTracks: function (playlistId, callback) {
		var tracks = this._getTracks(playlistId);

		callback(null, tracks);
	},

	getTrackById: function (playlistId, trackId, callback) {
		var tracks = this._getTracks(playlistId),
			i, len;

		for (i = 0, len = tracks.length; i < len; i++) {
			if (trackId === tracks[i].link.split(':')[2]) {
				callback(null, tracks[i]);
			}
		}
	},

	playPlaylist: function (playlistId, callback) {
		var playlist = this._getPlaylistById(playlistId),
			tracks = playlist.getTracks(),
			track, 
			self = this,
			i = 0;

		spotify.player.on('player_end_of_track', function (error, player) {
			i++;
			
			self._playTrack(tracks[i]);
		});

		this._playTrack(tracks[i]);

		callback(null, playlist);
	},

	_playTrack: function (track) {
		spotify.player.play(track);
	},

	_getTracks: function (playlistId) {
		var playlistContainer = spotify.playlistContainer,
			playlists = playlistContainer.getPlaylists(),
			i, len, playlist;

		for (i = 0, len = playlists.length; i < len; i++) {
			if (!!playlists[i].hasOwnProperty('link')) {
				if (playlistId === playlists[i].link.split(':')[4]) {
					return playlists[i].getTracks();
				}
			}
		}		
	},

	_getPlaylistById: function (id) {
		var playlistContainer = spotify.playlistContainer,
			playlists = playlistContainer.getPlaylists(),
			i, len;

		for (i = 0, len = playlists.length; i < len; i++) {
			if (!!playlists[i].hasOwnProperty('link')) {
				if (id === playlists[i].link.split(':')[4]) {
					return playlists[i];
				}				
			}
		}		
	}
};