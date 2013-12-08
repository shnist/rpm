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
				status: 'error',
				error: {
					message: 'Request parameter cannot be empty or undefined'
				}
			});
		}

		spotify.search(request.query.q, function (message) {
			response.status = 200;
			response.send({
				spotify: {
					query: request.query.q,
					image: request.query.image,
					results: {
						playlists: message.playlists,
						albums: message.albums
					}
				}
			});
		});

	} else {
		response.status = 200;
		response.send({
			status: 'error',
			error: {
				message: 'Not logged in'
			}
		});
	}
};

exports.play = function (request, response) {
	if (spotify.isLoggedIn()) {
		if (request.query.uri === '' || request.query.uri === undefined) {
			response.status = 200;
			response.send({
				error: 'Album or playlist uri cannot be empty or undefined'
			});
		}

		spotify.processPlayRequest(request.query.uri, function (message) {
			response.status = 200;
			if (message.status === 'error') {
				response.send(message);
			} else {
				response.send({
					status: 'playing',
					track: message.track,
					artist: message.artist
				});
			}
		});

	} else {
		response.status = 200;
		response.send({
			status: 'error',
			connected: false,
			error: {
				message: 'Not logged in'
			}
		});
	}
};