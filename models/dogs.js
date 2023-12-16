const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  tail: Boolean,
  hair: String,
  email: String
});

// Mongoose Library lets us define what a document looks like - fields, data types, etc.

// This "Dog" ends up being a constructor/class based on that schema
// Mongoose will help us to manage that...
const Dog = mongoose.model('Dog', dogSchema);

// We're exporting it here so that we can ... import it elsewhere
module.exports = Dog;
