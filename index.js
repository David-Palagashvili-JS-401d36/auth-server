'use strict';
// Standard express server scaffolding.

// require dotenv and the mongoose library.
require('dotenv').config();
const mongoose = require('mongoose');

// reading PORT from our .env file
const PORT = process.env.PORT || 3001;

// require lib/server.js
const authServer = require('./src/server.js');

// connect mongo database, open a default mongoose connection
mongoose.connect(process.env.MONGODB_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Prior to calling start() on our imported server module, it connects to Mongo, via mongoose.

const dataBase = mongoose.connection;

dataBase.on('open', () => {
  console.log('Now connected to Mongo Database');
});

// call the .start() method from the server with the PORT set in your environment
authServer.start(PORT);