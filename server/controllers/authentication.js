const User = require('../models/user');
const jwt = require('jwt-simple');

function tokenForUser(user) {
  return jwt.encode({ sub: user.id,
  iat: Math.round(Date.now() / 1000),
  exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)
  }, keys.TOKEN_SECRET)
}

exports.signUp = async (req, res) => {

}

exports.signIn = async (req, res) => {

}

exports.currentUser = async (req, res) => {

}

