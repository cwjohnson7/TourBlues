const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  artistName: String,
  events: [{ type: Schema.Types.ObjectId, ref: 'event' }]
})