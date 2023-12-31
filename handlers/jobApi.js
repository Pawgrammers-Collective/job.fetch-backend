'use strict';
const axios = require('axios');


// Job Data Filter for front end
class JobFilter{
    constructor(job){
        this.title= job.title,
        this.companyName = job.company_name,
        this.location= job.location,
        this.description= job.description,
        this.qualifications= job.job_highlights[0]
        this.responsibilities= job.job_highlights[1]
    }
}

// API call for Jobs
async function handleGetJobs(request,response){
    let location = request.query.location
    try{
        let locationJobs = await axios.get(`https://serpapi.com/search?engine=google_jobs`,{
            params: {
                engine: "google_jobs",
                q: `software developer ${location}`,
                hl: "en",
                api_key: process.env.SERPAPI
            },
        })
        // console.log(locationJobs.data.jobs_results);
        response.status(200).send(locationJobs.data.jobs_results.map((v) =>{
            return new JobFilter(v);
        }))
        } catch (e){
        response.status(400).send(e)
    }
}


module.exports = handleGetJobs
