var Noduino = {
	index: function (request, response) {
		var state = request.query.state;

		response.redirect('/?state=' + state);
	},
	connect: function (request, response) {
		console.log(request);
		response.status = 200;
		response.send({
			hello: 'world'
		});
	}
};

module.exports = Noduino;