const mongoose = require('mongoose');

const { Schema } = mongoose;
const crypto = require('crypto');

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  firstName: String,
  lastName: String,
  artistName: String,
  artistId: { type: Schema.Types.ObjectId, ref: 'artist' },
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');

  return this.hash === hash;
};

module.exports = mongoose.model('user', UserSchema);
