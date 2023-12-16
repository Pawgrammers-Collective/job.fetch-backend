// 3rd Party Dependencies
require('dotenv').config();
const mongoose = require('mongoose');

// Our own dependencies
const server = require('./server.js');

// Make a database connection
// This is a permanent/live connection
// Active until the app stops running
mongoose.connect( process.env.MONGODB_URL );

// Start up the server
server.start( process.env.PORT || 3000 );