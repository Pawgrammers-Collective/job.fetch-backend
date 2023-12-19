const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobData: Object,
  email: String
});

// Mongoose Library lets us define what a document looks like - fields, data types, etc.

// This "Dog" ends up being a constructor/class based on that schema
// Mongoose will help us to manage that...
const Job = mongoose.model('Job', jobSchema);

// We're exporting it here so that we can ... import it elsewhere
module.exports = Job;
