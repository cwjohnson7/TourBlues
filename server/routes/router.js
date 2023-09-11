const passportService = require('../services/passport');
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
  // app.post('/api/addArtist',  Artist.addArtist)
  // app.post('/api/addArtist',  Artist.addLineupArtist)
  // app.put('/api/updateArtist',  Artist.updateArtist)
  // app.get('/api/getArtist',  Artist.getArtist )


  //venue
  // app.post('/api/addVenue' , Venue.addVenue)
  // app.put('/api/updateVenue', Venue.updateVenue)
  // app.get('/api/getVenue', Venue.getVenue)

}