const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  artistName: { type: Schema.Types.ObjectId, ref: 'artistName' },
  venue: { type: Schema.Types.ObjectId, ref: "venue" },
  artists: [{ type: Schema.Types.ObjectId, ref: "artist" }],
  doors: String,
  setLength: Number,
})