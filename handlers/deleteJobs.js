'use strict';

const Jobs = require('../models/jobs.js');

async function handleDeleteJobs(request, response) {
  const { id } = request.params;

  try {
    const filter = { _id: id };

    if (request.user) {
      filter.email = request.user.email;
    }

    const job = await Jobs.findOne(filter);

    if (!job) {
      return response.status(400).send('Unable to delete job');
    } else {
      await Jobs.findByIdAndDelete(id);
      return response.status(204).send('Job deleted successfully');
    }
  } catch (e) {
    console.error(e);
    return response.status(500).send('Server error');
  }
}

module.exports = handleDeleteJobs;
