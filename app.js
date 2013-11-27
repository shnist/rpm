var spotify = require('spotify')({ appkeyFile: 'spotify_appkeyFile.key' });
spotify.ready( function() {
 var starredTracks = spotify.getStarred().getTracks();
 console.log(starredTracks);
 spotify.player.play(starredTracks[0]);
});
spotify.login('aaronfaber', '23!Arsakia1089', false, false);