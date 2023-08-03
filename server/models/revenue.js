const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RevenueSchema = new Schema({
  name: String,
  amount: Number
})