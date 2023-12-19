// 3rd party dependencies
const express = require('express');
const cors = require('cors');
const app = express();

// TURN THIS BACK ON ------------------------------------------------------------------------------------
// const verifyUser = require('./middleware/authorize.js')

// Middleware
app.use(cors());
app.use(express.json())
// TURN THIS BACK ON ------------------------------------------------------------------------------------
// app.use(verifyUser);

// Interal Dependencies
const handleGetJobs = require('./handlers/jobApi.js');
const handleSaveJobs = require('./handlers/savejobs.js')




// Route Handlers 
app.get('/jobs', handleGetJobs)
app.post('/jobs', handleSaveJobs)




const server = {
  start: function(port) {
    app.listen(port, () => console.log(`Up on port ${port}`))
  }
}

module.exports = server;