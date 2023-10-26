const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  name: String,
  amount: Number,
  artist: { type: Schema.Types.ObjectId, ref: 'artist' },
});

module.exports = mongoose.model('expense', ExpenseSchema);
