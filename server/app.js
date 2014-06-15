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
    path: '/v1/tracks',
    handler: function (request, reply) {
        reply('tracks');
    }
});

server.route({
    method: 'get',
    path: '/v1/tracks/{id}',
    handler: function (request, reply) {
        reply('track:' + request.params.id);
    }
});

server.route({
    method: 'get',
    path: '/v1/playlists',
    handler: function (request, reply) {
        reply('playlists');
    }
});

server.route({
    method: 'get',
    path: '/v1/playlists/{id}',
    handler: function (request, reply) {
        reply('playlists:' + request.params.id);
    }
});

server.route({
    method: 'get',
    path: '/v1/albums',
    handler: function (request, reply) {
        reply('albums');
    }
});

server.route({
    method: 'get',
    path: '/v1/albums/{id}',
    handler: function (request, reply) {
        reply('albums:' + request.params.id);
    }
});