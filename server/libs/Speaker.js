var Speaker = require('./DigitalOutput');

Speaker.prototype.isMuted = function() {
	return !this.active;
};

exports.Speaker = Speaker;