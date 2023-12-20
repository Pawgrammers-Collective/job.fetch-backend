'use strict';

const axios = require('axios');
const Jobs = require('../models/jobs.js')


async function handleSaveJobs(request,response){
    try{
        console.log(request.body);
        let savedJob = request.body;
        let userEmail = request.user ? request.user.email : null;

    if (!userEmail) {
      return response.status(401).send('Unauthorized');
    }

    let jobData = {
      jobData: savedJob,
      email: userEmail
    };

        let addedSavedJob = await Jobs.create(jobData)

        response.status(201).send(addedSavedJob)
        
        } catch (e){
        response.send('job save not working', e)
    }
}


async function handleGetSavedJobs(request, response){
    let filter = {};
    if(request.user){
        filter.email = request.user.email
    }
    try{
        const savedJobs = await Jobs.find(filter)
        if(savedJobs.length > 0){
            response.status(200).json(savedJobs)
        }else{
            response.status(400).send('No Saved Jobs')
        }}catch(e){
            response.status(400).send(e)
        }
}
// This is from can-o-books, only use for ref-------------------------------------------------------------------
// async function handleJob( request, response ) {
//     let filter = { };
//     console.log('request user',request.user)
//     if(request.user){
//       filter.email=request.user.email;
//     }
//     try{
//       const jobs = await Jobs.find(filter)
//       if(dogs.length > 0){
//         response.status(200).json(dogs);
//       }else{
//         response.status(404).send('error');
//       }
//     }catch(e){
//       console.error(e);
//       response.status(500).send('server error')
//     }
//   }
  

module.exports = {handleSaveJobs, handleGetSavedJobs};
