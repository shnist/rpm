# RPM

Physicalising music

## Set Up

### NPM
The following packages need to be installed globaller. You may need to be sudo in order to do this.

`npm install -g node-gyp`

To install local dependencies simply run `npm install` in the root of the project.

### Lib spotify
If you use `brew` then you can install lib-spotify pretty easily using:

`brew install libspotify`

### Compiling the lib-spotify library
* Clone the library onto your machine
`git clone https://github.com/FrontierPsychiatrist/node-spotify.git lib-spotify`
* CD into the root of the project
* Run `node-gyp configure && node-gyp build`
* This will compile the library to use as a node module. This is located in `/build/Release/`
* Copy the contents of this folder into a folder called `spotify` into the RPM project (at root level)


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
		name: 'your username',
		password: 'your password'
	};

The file needs to reside in the same place as the Spotify code.