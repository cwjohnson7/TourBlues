const artist = require('../models/artist');
const Artist = require('../models/artist')
const User = require('../models/user');
const jwt = require('jwt-simple');
const keys = require('../config/keys')

function tokenForUser(user) {
  return jwt.encode({ sub: user.id,
  iat: Math.round(Date.now() / 1000),
  exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)
  }, keys.TOKEN_SECRET)
}

exports.signUp = async (req, res) => {
  //req.body.artist is the artist name entered on the sign-up form
  const { email, bandEmail, password, firstName, lastName, phone, handle, artist } = req.body
  
  console.log("sign UP req.body: ", req.body);

  if (!email || !password) {
    return res.status(422).send({ error: "You must provide email and password"})
  }

  User.findOne({ email: email }).then((err, result) => {
    if (err) {
      return next(err);
    }
    // If a user with email does exist, return an error
    if (result) {
      return res.status(422).send({ error: "Email is in use" });
    }

    Artist.findOne({ name: artist }).then((existingArtist) => {
      if (!existingArtist) {
        const newArtist = new Artist({
          name: req.body.artist,
          email: req.body.artistEmail || req.body.email,
          contact: req.body.firstName + ' ' + req.body.lastName,
          phone: req.body.phone || '',
          handle: req.body.handle || ''
        });
        newArtist.save();

        const user = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          artistId: newArtist._id,
          artistName: newArtist.name
        });
        const artistName = newArtist.name;
        user.setPassword(password);
        user.save().then(() => {
          res.status(200).json({ token: tokenForUser(user), user, newArtist } )
        });
        console.log("NewArtist: ", newArtist);
      } else {
        const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        artist: existingArtist._id,
        artistName: existingArtist.name
        });
        const artistName = existingArtist.name;
        console.log('existing Artist: ', artistName);
        user.setPassword(password);
        user.save().then(() => {
          res.status(200).json({ token: tokenForUser(user), user, artistName})
        })
      };
    });
  });
}

exports.signIn = async (req, res) => {
  const user = req.user;
  const id = req.user.artistId
  const artist = await Artist.findById(id)

  res.status(200).send({
    token: tokenForUser(user),
    user: user,
    artistName: artist.name
  })
}

exports.currentUser = async (req, res) => {

  const id = req.user.artistId
  const artist = await Artist.findById(id);
  const user = {
    email: req.user.email,
    token: tokenForUser(req.user),
    artistName: artist.name
  }
  res.status(200).send(user);
}

