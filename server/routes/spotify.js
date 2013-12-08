var spotify = require('../../spotify/spotify_wrapper');


spotify.init();

exports.checkLogIn = function (request, response) {
	if (spotify.isLoggedIn()) {
		response.status = 200;
		response.send({
			connected: true,
			profile: {
				username: spotify.getUserName()
			}
		});
	} else {
		response.status = 200;
		response.send({
			connected: false,
			error: 'Not logged in'
		});
	}
};

exports.login = function (request, response) {
	if (!request.body.username) {
		response.status = 200;
		response.send({
			error: 'Username required'
		});
	}

	if(!request.body.password) {
		response.status = 200;
		response.send({
			error: 'Password required'
		});
	}

	var username = request.body.username;
	var password = request.body.password;

	spotify.login(username, password, function (error, message) {

		if (error) {
			response.status = 200;
			response.send({
				connected: false,
				error: message.error.toString()
			});
		} else {
			response.status = 200;
			response.send({
				connected: message.connected,
				profile: {
					username: message.username
				}
			});
		}

	});
};

exports.search = function (request, response) {
	if (spotify.isLoggedIn()) {
		if (request.query.q === '' || request.query.q === undefined) {
			response.status = 200;
			response.send({
				error: 'Request parameter cannot be empty or undefined'
			});
		}

		spotify.search(request.query.q, function (message) {
			console.log(message);

			response.status = 200;
			response.send({
				imageId: request.query.image,
				playlists: message.playlists,
				albums: message.albums
			});
		});
	} else {
		response.status = 200;
		response.send({
			connected: false,
			error: 'Not logged in'
		});
	}
};