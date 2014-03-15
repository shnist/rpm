var Motor = require('./DigitalOutput');

Motor.prototype.setSpeed = function(speed) {
	this.set(speed);
};
  
exports.Motor = Motor;