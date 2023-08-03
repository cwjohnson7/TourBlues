const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = new Schema ({
  name: String,
  address: String,
  contact: String,
  phone: String,
  email: String,
  completed: Boolean,
})