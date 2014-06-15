'use strict';

var Hapi = require('hapi'),
    server = new Hapi.Server('localhost', 9000),
    spotify = require('./utils/spotify_interface');


server.start(function () {
    console.log('Started server at ' + server.info.host + ':' + server.info.port);
});

server.route({
    method: 'post',
    path: '/v1/login',
    handler: function (request, reply) {
        var credentials = {
            username: request.query.username || request.payload.username,
            password: request.query.password || request.payload.password
        };

        spotify.login(credentials, function (error) {
            if (error) {
                reply(error);
            } else {
                reply('success');
            }
        });
    }
});

server.route({
    method: 'get',
    path: '/v1/search',
    handler: function (request, reply) {
        var query = request.query.q || request.payload.q;

        spotify.search(query, function (error, result) {
            if (error) {
                reply(error);
            } else {
                reply(result);
            }
        });
    }
});

server.route({
    method: 'get',
    path: '/v1/playlists',
    handler: function (request, reply) {
        spotify.getPlaylists(function (error, playlists) {
            if (error) {
                reply(error);
            } else {
                reply(playlists);
            }
        });
    }
});

server.route({
    method: 'get',
    path: '/v1/playlists/{id}',
    handler: function (request, reply) {
        var id = request.params.id;

        spotify.getPlaylistById(id, function (error, playlist) {
            if (error) {
                reply(error);
            } else {
                reply(playlist);
            }
        });
    }
});

server.route({
    method: 'get',
    path: '/v1/playlists/{playlistId}/tracks',
    handler: function (request, reply) {
        var playlistId = request.params.playlistId;

        spotify.getTracks(playlistId, function (error, tracks) {
            if (error) {
                reply(error);
            } else {
                reply(tracks);
            }
        });
    }
});

server.route({
    method: 'get',
    path: '/v1/playlists/{playlistId}/tracks/{id}',
    handler: function (request, reply) {
        var playlistId = request.params.playlistId,
            trackId = request.params.id;

        spotify.getTrackById(playlistId, trackId, function (error, track) {
            if (error) {
                reply(error);
            } else {
                reply(track);
            }
        });
    }
});

server.route({
    method: 'put',
    path: '/v1/playlists/{id}/play',
    handler: function (request, reply) {
        var playlistId = request.params.id;

        spotify.playPlaylist(playlistId, function (error, playlist) {
            if (error) {
                reply(error);
            } else {
                reply(playlist);
            }
        });
    }
});

server.route({
    method: 'get',
    path: '/v1/player/stop',
    handler: function (request, reply) {
        spotify.stopPlayer(function (error) {
            if (error) {
                reply(error);
            } else {
                reply('success');
            }
        });
    }
});
