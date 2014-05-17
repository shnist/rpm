'use strict';

var express = require('express'),
    http = require('http'),
    app = module.exports = express(),
    port = 3010,
    appPath = __dirname + '/../app',
    server;

app.configure(function() {
    app.use(express.favicon());
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

require('./routes/spotify')(app);

server = http.createServer(app);
server.listen(port, '0.0.0.0');

console.log('Listening to port ', port);