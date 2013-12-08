'use strict';

var express = require('express'),
    http = require('http'),
    app = module.exports = express(),
    port = 3010,
    appPath = __dirname + '/../app',
    server;

var spotify = require('./routes/spotify');
var noduino = require('./routes/noduino');

app.configure(function() {
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('SIDD1H6WBHP7HME2FXY9M7HM06L4PDIIIRBF9417'));
    app.use(express.session({
        path: '*',
        httpOnly: true,
        maxAge: 60000 * 60 * 24 * 30
    }));
    app.use(express.static(appPath));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/api/spotify', spotify.checkLogIn);
app.post('/login', spotify.login);
app.get('/search', spotify.search);
app.get('/noduino', noduino.index);
app.get('/play', spotify.play);

app.get('/home', function (req, res) {
    var state = req.query.state;
    var url = 'app/home.html';

    if (state !== undefined) {
        url += '?state=' + state.toString();
    }

    res.sendfile(url, {
        path: '../'
    });
});

app.get('/', function (request, response) {
    response.redirect(301, 'http://localhost:8086');
});

app.post('/stubs/search', function (req, res) {
    res.sendfile('app/stubs/search.json', {
        path: '../'
    });
});

server = http.createServer(app);
server.listen(port, '0.0.0.0');

console.log('Listening to port ', port);
