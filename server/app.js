'use strict';

var Hapi = require('hapi'),
    server = new Hapi.Server('localhost', 9000);

server.start(function () {
    console.log('Started server at ' + server.info.host + ':' + server.info.port);
});

server.route({
    method: 'post',
    path: '/v1/login',
    handler: function (request, reply) {
        reply('login');
    }
});

server.route({
    method: 'get',
    path: '/v1/search',
    handler: function (request, reply) {
        reply('search');
    }
});

server.route({
    method: 'get',
    path: '/v1/tracks/{id}',
    handler: function (request, reply) {
        console.log(request.params.id);
        reply('tracks');
    }
});

server.route({
    method: 'get',
    path: '/v1/playlists/{id}',
    handler: function (request, reply) {
        console.log(request.params.id);
        reply('playlists');
    }
});

server.route({
    method: 'get',
    path: '/v1/albums/{id}',
    handler: function (request, reply) {
        console.log(request.params.id);
        reply('albums');
    }
});