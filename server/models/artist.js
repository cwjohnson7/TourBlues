const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema ({
  name: String,
  contact: String,
  email: String,
  handle: String,
  phone: String,
})