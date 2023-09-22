const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RevenueSchema = new Schema({
  name: String,
  amount: Number,
  artist: { type: Schema.Types.ObjectId, ref: 'artist' }
});

module.exports = mongoose.model('revenue', RevenueSchema);