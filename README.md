# RPM

Physicalising music

## Set Up

### NPM
The following packages need to be installed globally. You may need to be sudo in order to do this.

`npm install -g node-gyp`

To install local dependencies simply run `npm install` in the root of the project.

### Noduino
To run rpmDuino you need to cd in the /noduino folder and run `node srv.web.js`

## Image Matcher
ImageMatcher is a Spring Boot Java application that provides a RESTful interface to a connected camera and image matching algorithms.

The Images are stored in memory (HashMap) and on the file system (under data/images).
The album metadata is also stored in memory (separate HashMap) and on the file system (under data/albums) as JSON.

### Running image matcher code
* CD into the `image_matcher` folder in the rpm project
* Run `mvn package` to compile the project
* Once compiled run `sh start.sh` to initialise

### RESTful Endpoints:

#### /snap - *GET*

Snap tells the camera to take an image and save it to the file system.

**Returns:**

{
	"id" : "1",
	"image" : "Base64 encoded PNG"
}

#### /update - *POST*

Creates an album give an image id, artist and album name

**Expects:**

{
	"id" : "1",
	"artist" : "Ben",
	"albumName" : "Imma do some music"
}

**Returns:**

Success:

{
	"status" : "success",
	"message" : "album successfully created"
}

Error:

{
	"status" : "error",
	"message" : "unable to create album"
}

#### /identify - *GET*

Takes an image (but does not save it to the filesystem) and then loops through the albums and returns the album with the
image that most closest matches the image taken.

Please note: the only time this will not return an album is if there are no albums in the system. If you scan an album
which is not in the system it will return the album with the image that it most closely resembles.

**Returns:**

Success:

{
	"id" : "1",
	"artist" : "Ben",
	"albumName" : "Imma do some music"
}

Error:

{
	"status" : "error",
	"message" : "No best match found"
}

#### /camera - *POST*

Changes the attached camera by providing it's id. *This is used during initial setup to choose the correct camera on systems
with multiple camera*. This will need to be done each time the application is started as this information is not persisted.

**Expects:**

{
	"id" : 0
}

**Returns:**

{
	"status" : "success",
	"message" : "Camera changed"
}

## Spotify Service
### Log in
In order to be able to use the spotify part of the application you need to create `spotify_login.js` file
with an object that contains your spotify user name and password. An example is given below:

	exports.user = {
		username: 'your username',
		password: 'your password'
	};

The file needs to reside in the same place as the Spotify code.

### Spotify Web
We have settled on the following spotify api - https://github.com/TooTallNate/node-spotify-web.git
It implements the "Spotify Web" WebSocket protocol that is used on Spotify's Web UI.

The module has been added as dependency to the package.json, so simply run `npm install` to include it.

You DON'T need an API key for this anymore. Speak to Aaron for credential details.

## Noduino service
### Events
The arduino provides to forms of functionality, a toggle switch (to dictate whether the device is on play or record) and a button to trigger the action.

#### Toggle Switch

In the rpmDuino file events are set for both, firstly the toogle switch - set on pin 10 of the arduino - listens for a change event, if the change event is fired a global variable of toggleSwitch is updated.

		board.withButton({pin: 10}, function(err, Button) {
            Button.on('change', function(B) {

                if(B.pushed === true){
                  toggleSwitch = false;
                }else{
                  toggleSwitch = true;
                }
            });
          });

From the B event we can grab the pushed state, if this is set to true we assume a play state if false a record state.

#### Button

For the button we listen to the Push event

		board.withButton({pin: 6}, function(err, Button) {
        	Button.on('push', function(B) {
	            switch(toggleSwitch){
	              case true :
	                console.log('pin 6 & start playing', i++);
	              break;
	              case false :
	                console.log('pin 6 & start recording', i++);
	              break
	            }

        	});
    	});

if the event is fired and the var of toggleSwitch is true we know to call the play part of the api, otherwise we start the record route.

As default we assume False on toggleSwitch since we assume no record has been trained.