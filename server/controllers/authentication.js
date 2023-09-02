const Artist = require('../models/artist')
const User = require('../models/user');
const jwt = require('jwt-simple');

function tokenForUser(user) {
  return jwt.encode({ sub: user.id,
  iat: Math.round(Date.now() / 1000),
  exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)
  }, keys.TOKEN_SECRET)
}

exports.signUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //req.body.artist is the artist name entered on the sign-up form
  const artist = req.body.artist;
  console.log(req.body, "sign UP");

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
        let newArtist = new Artist({
          name: req.body.artist,
          email: req.body.email,
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
          res.json({ token: tokenForUser(user), user, artistName } )
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
        user.setPassword(password);
        user.save().then(() => {
          res.json({ token: tokenForUser(user), user, artistName})
        })
      };
    });
  });
}

exports.signIn = async (req, res) => {

}

exports.currentUser = async (req, res) => {

}

