'use strict';

var express = require('express'),
    http = require('http'),
    app = module.exports = express(),
    port = 3000,
    appPath = __dirname + '/../app',
    server;

var index = require('./routes/index');
/*
    login = require('routes/login'),
    search = require('routes/search'),
    tag = require('routes/tag'),
    play = require('routes/play');
*/
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

app.get('/', index.load);
/*app.post('/login', login.index);
app.get('/search/:term', search.index);
app.post('/tag', tag.index);
app.get('/play', play.index);*/

app.get('/home', function (req, res) {
    res.sendfile('app/home.html', {
        path: '../'
    });
})

server = http.createServer(app);
server.listen(port, '0.0.0.0');

console.log('Listening to port ', port);

