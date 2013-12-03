rpm
===

Physicalising music

## Dependencies

### NPM
npm install -g node-gyp

### Lib spotify
If you use `brew` then you can install lib-spotify pretty easily using:

`brew install libspotify`

## Compiling the lib-spotify library
* Clone the library onto your machine
`git clone https://github.com/FrontierPsychiatrist/node-spotify.git lib-spotify`
* CD into the root of the project
* Run `node-gyp configure && node-gyp build`
* This will compile the library to use as a node module. This is located in `/build/Release/`
* Copy the contents of this folder into a folder called `spotify` into the RPM project (at root level)
