'use strict';

const axios = require('axios');
const Jobs = require('../models/jobs.js');

class JobFilter {
  constructor(job) {
    this.title = job.title;
    this.location = job.location;
    this.description = job.description;
    this.qualifications = job.job_highlights[0];
    this.responsibilities = job.job_highlights[1];
  }
}

async function handleGetJobs(request, response) {
  try {
    if (!request.user || !request.user.email) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    let location = request.query.location;

    try {
      let locationJobs = await axios.get('https://serpapi.com/search?engine=google_jobs', {
        params: {
          engine: 'google_jobs',
          q: `software developer ${location}`,
          hl: 'en',
          api_key: process.env.SERPAPI
        }
      });

      const jobs = locationJobs.data.jobs_results.map((v) => new JobFilter(v));

      const searchObject = { email: request.user.email };
      const jobsWithUser = jobs.map((job) => ({ ...job, ...searchObject }));

      response.status(200).json(jobsWithUser);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = handleGetJobs;
