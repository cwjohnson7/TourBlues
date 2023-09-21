const passportService = require('../services/passport');
const passport = require("passport");
const Artist = require("../controllers/artist");
const Authentication = require("../controllers/authentication");
const Event = require('../controllers/event');
const Venue = require("../controllers/venue");
const Tour = require('../controllers/tour');
const Revenue = require('../controllers/revenue');

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = (app) => {
  //auth
  //tested
  app.post('/api/signup', Authentication.signUp)
  app.post('/api/signin', requireSignin, Authentication.signIn)
  app.get('/api/current_user', requireAuth, Authentication.currentUser)

  //artist
  //tested
  app.post('/api/addArtist',  Artist.addArtist)
  app.post('/api/addLineupArtist',  Artist.addLineupArtist)
  app.put('/api/updateArtist',  Artist.updateArtist)
  app.delete('/api/removeArtist', Artist.removeArtist)
  app.delete('/api/removeLineupArtist', Artist.removeLineupArtist)
  app.get('/api/getArtist',  Artist.getArtist)

  //event
  //tested
  app.post('/api/addEvent', Event.addEvent)
  app.put('/api/updateEvent', Event.updateEvent)
  app.delete('/api/removeEvent', Event.removeEvent)

  //tour
  //tested
  app.post('/api/addTour', Tour.addTour)
  app.put('/api/updateTour', Tour.updateTour)
  app.delete('/api/removeTour', Tour.removeTour)

  //Square Pay
  app.get('/api/getRevenue', Revenue.getRevenue)

  //venue - avoided as venues are created with events
  // app.post('/api/addVenue' , Venue.addVenue)
  // app.put('/api/updateVenue', Venue.updateVenue)
  // app.get('/api/getVenue', Venue.getVenue)

}