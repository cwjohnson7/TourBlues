const mongoose = require('mongoose');

const { Schema } = mongoose;

const VenueSchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  contact: String,
  phone: String,
  email: String,
  completed: Boolean,
});

module.exports = mongoose.model('venue', VenueSchema);
