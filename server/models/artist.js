const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema ({
  name: String,
  contact: String,
  email: String,
  handle: { type: String, unique: true},
  events: [{ type: Schema.Types.ObjectId, ref: 'event' }],
  phone: String,
})

module.exports = mongoose.model('artist', ArtistSchema);