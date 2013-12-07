/**
	Login route
*/

exports.index = function (request, response) {
	// check user is logged in

	// if logged in
		// check state of noduino
		// if play
			// response render play
		// if capture
			// capture image matcher api
			// response render search
	// else
		// response render login


	response.render('home', {
		"hello": "world"
	});
};

