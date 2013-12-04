# RPM

Physicalising music

## Dependencies

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

### Updating the image matcher code

#### For the first time
* Clone the image matcher library onto your machine
`git clone https://github.com/bjsswanson/ImageMatcher.git`
* Copy the contents of the folder into the `image_matcher` folder in the rpm project

#### Subsequent updates
* CD into the clone of the image matcher library
* Run `git pull origin master` to fetch the latest code
* Copy the contents into the `image_matcher` folder in the rpm project

### Running image matcher code
* CD into the `image_matcher` folder in the rpm project
* Run `mvn package` to compile the project
* Once compiled run `sh start.sh` to initialise
