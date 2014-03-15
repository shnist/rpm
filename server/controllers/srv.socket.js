var io = require('socket.io'), 
    Noduino = require('./libs/Noduino'),
    Connector = require('./libs/Noduino.Serial'), 
    Logger = require('./libs/Logger');

/**
* Define SocketHandler
* @param object socket Socket.IO
*/
var SocketHandler = function(socket) {
    this.sockets  = {};
    this.arduinos = {};
    this.handler  = socket.listen(8090);
    this.handler.set('origin', '*');
    this.pinCache = {};

    this.bindings();
};

/**
* Get selected Arduino
*/
SocketHandler.prototype.current = function() {
    return this.arduinos[0];
};

/**
* Connect Bindings
*/
SocketHandler.prototype.bindings = function() {
    var io = this.handler, that = this;

    io.sockets.on('connection', function(socket) {
        that.sockets[socket.id] = socket;

        /**
        * Incoming Serial Request
        */
        that.sockets[socket.id].on('serial', function(data) {
            switch (data.type) {
                case 'write':
                that.current().write(data.write);
                break;
                case 'analogRead':
                var curPin = data.pin;
                that.current().watchAnalogIn({'pin': data.pin}, function(m) {
                    if (!m.pin || m.pin == null || m.pin == NaN) {
                        return; }

                        if (m.state != that.pinCache[m.pin] && curPin == m.pin) {
                            socket.emit('response', {'type': 'analogRead', 'pin': m.pin, 'value': m.state});
                            that.pinCache[m.pin] = m.state;
                        }
                    });
                break;
                case 'digitalRead':
                var curPin = data.pin;
                that.current().watchDigitalIn({'pin': data.pin}, function(m) {
                    if (!m.pin || m.pin == null || m.pin == NaN) {
                        return; 
                    }

                    if (m.state != that.pinCache[m.pin] && curPin == m.pin) {
                        socket.emit('response', {'type': 'digitalRead', 'pin': m.pin, 'value': m.state});
                        that.pinCache[m.pin] = m.state;
                    }
                });
                break;
            }
        });

        /**
        * Connect to Arduino
        */      
        that.sockets[socket.id].on('board.connect', function(data) {
            if (that.current() && that.current().connected == true) {
                return socket.emit('response', {'msg': 'board.connect', 'response': 'ready'}); 
            }

            that.arduinos[0] = new Noduino({'debug': true}, Connector, Logger);
            that.current().connect(function(err, board) {
                that.current().connected = false;
                if (err) { return socket.emit('response', {'msg': 'board.connect', 'response': 'failed'}); }

                that.current().connected = true;
                return socket.emit('response', {'msg': 'board.connect', 'response': 'ready'});
            });
        });
    });
};

exports.socket = SocketHandler(io, Noduino, Connector, Logger);