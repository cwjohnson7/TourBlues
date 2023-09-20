const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourSchema = new Schema({
  artist: { type: Schema.Types.ObjectId, ref: 'artist' },
  name: String,
  events: [{ type: Schema.Types.ObjectId, ref: "event" }],
})

module.exports = mongoose.model('tour', TourSchema);