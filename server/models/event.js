const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  artist: { type: Schema.Types.ObjectId, ref: 'artist' },
  venue: { type: Schema.Types.ObjectId, ref: "venue" },
  lineup: [{ type: Schema.Types.ObjectId, ref: "artist" }],
  doors: String,
  setLength: Number,
})

module.exports = mongoose.model('event', EventSchema);