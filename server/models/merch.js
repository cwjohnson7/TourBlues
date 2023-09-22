const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchSchema = new Schema({
  name: String,
  unitCost: Number,
  unitPrice: Number,
  qty: Number,
  artist: { type: Schema.Types.ObjectId, ref: 'artist' }
})

module.exports = mongoose.model('merch', MerchSchema);