const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  artist: { type: Schema.Types.ObjectId, ref: 'artist' },
  tour: { type: Schema.Types.ObjectId, ref: 'tour' },
  venue: { type: Schema.Types.ObjectId, ref: 'venue' },
  lineup: [{ type: Schema.Types.ObjectId, ref: 'artist' }],
  date: String,
  doors: String,
  setLength: Number,
});

EventSchema.pre('update', function (next) {
  this.model('Event').update(
    {},
    { $pull: { events: this._id } },
    { multi: true },
    next
  );
});

module.exports = mongoose.model('event', EventSchema);
