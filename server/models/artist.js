const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArtistSchema = new Schema({
  name: String,
  contact: String,
  email: String,
  handle: { type: String, unique: true },
  tours: [{ type: Schema.Types.ObjectId, ref: 'tour' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'event' }],
  phone: String,
});

module.exports = mongoose.model('artist', ArtistSchema);
