Experiment in live GPS updates
================

A simple `node.js` server that opens a Google Map and starts moving a marker by sending simulated GPS lat/lng updates every few seconds.

Prerequisites:
---------
Here's what you need:

* A valid **Google API key** (I believe of the _Google Maps JavaScript API_ variery).
* **Node.js**: I prefer to install it via `nvm` in case I ever have other projects that require a different version of `node`. At the moment I have `node v7.2.1`. Other versions may also work fine.

Building and running
------------

All the code is in `src/`. So, open a `bash` terminal and say:
```
cd src/
npm install
export GOOGLE_API_KEY=<your_key>
```
Then just run the server:
```
node server.js
```

Open a tab/window and point it to `localhost:17000`.

Should see a map on your screen and a moving _Joe Doe_ marker.

