'use strict';

const axios = require('axios');
const Jobs = require('../models/jobs.js')


async function handleSaveJobs(request,response){
    let filter = {};
    if(request.user){
        filter.email = request.user.email
    }
    try{
        console.log(request.body);
        let savedJob = request.body;
        let userEmail = request.user.email;
        let jobData = {
            jobData: savedJob,
            email: userEmail
        }
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

async function deleteSavedJobs(request, response){
    console.log('hello!')
    try{
        let id = request.params.id;
        console.log(request.params)
        let deletedjob = await Jobs.findByIdAndDelete(id);
        console.log('Deleated',deletedjob);
        response.status(204).send({});
    }catch(e){
        console.log(e);
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
  

module.exports = {handleSaveJobs, handleGetSavedJobs , deleteSavedJobs};
