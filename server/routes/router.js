const passport = require("passport");
const Artist = require("../controllers/artist");
const Authentication = require("../controllers/authentication");
const Venue = require("../controllers/venue");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = (app) => {
  //auth
  app.post('/api/signup', Authentication.signUp)
  app.post('/api/signin', requireSignin, Authentication.signIn)
  app.get('/api/current_user', requireAuth, Authentication.currentUser)

  //artist
  app.post('/api/addArtist', Artist.addArtist)
  app.post('/api/updateArtist', Artist.updateArtist)

  //venue
  app.post('/api/addVenue', Venue.addVenue)
}