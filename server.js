// 3rd party dependencies
const express = require('express');
const cors = require('cors');

// Get access to the dogs collection
const Dogs = require('./models/dogs.js')
const verifyUser = require('./authorize.js')

const app = express();
app.use(cors());
app.use(verifyUser);


app.get('/dogs', handleGetDogs);

async function handleGetDogs( request, response ) {
  let filter = { };
  console.log('request user',request.user)

  if(request.user){
    filter.email=request.user.email;
  }
  try{
    const dogs = await Dogs.find(filter)
    if(dogs.length > 0){
      response.status(200).json(dogs);
    }else{
      response.status(404).send('error');
    }
  }catch(e){
    console.error(e);
    response.status(500).send('server error')
  }
  
}

const server = {
  start: function(port) {
    app.listen(port, () => console.log(`Up on port ${port}`))
  }
}

module.exports = server;