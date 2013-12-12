exports.index = function (request, response) {
	var state = request.query.state;

	response.redirect('/?state=' + state);
};