const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema({
  coverletter: String,
  jobDescription: String,
  
});

// Mongoose Library lets us define what a document looks like - fields, data types, etc.

// This "Dog" ends up being a constructor/class based on that schema
// Mongoose will help us to manage that...
const CoverLetter = mongoose.model('CoverLetter', coverLetterSchema);

// We're exporting it here so that we can ... import it elsewhere
module.exports = CoverLetter;