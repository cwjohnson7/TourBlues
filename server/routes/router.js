const Authentication = require('../controllers/authentication');
const passport = require('passport');
const passportService = require('../services/passport');
const Artist = require('../controllers/artist');
const Event = require('../controllers/event');
const Venue = require('../controllers/venue');
const Tour = require('../controllers/tour');
const Revenue = require('../controllers/revenue');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // auth
  // tested
  app.post('/api/signup', Authentication.signUp);
  app.post('/api/signin', requireSignin, Authentication.signIn);
  app.get('/api/currentUser', requireAuth, Authentication.currentUser);

  // artist
  // tested
  app.post('/api/addArtist', requireAuth, Artist.addArtist);
  app.post('/api/addLineupArtist', requireAuth, Artist.addLineupArtist);
  app.put('/api/updateArtist', requireAuth, Artist.updateArtist);
  app.delete('/api/removeArtist', requireAuth, Artist.removeArtist);
  app.delete('/api/removeLineupArtist', requireAuth, Artist.removeLineupArtist);
  app.get('/api/getArtist', requireAuth, Artist.getArtist);
  app.get('/api/getArtistById', requireAuth, Artist.getArtistById);

  // event
  // tested
  app.post('/api/addEvent', requireAuth, Event.addEvent);
  app.get('/api/getEvents/:tourId', requireAuth, Event.getEventsByTour);
  app.get('/api/getEvent/:eventId', requireAuth, Event.getEventById);
  app.put('/api/updateEvent', requireAuth, Event.updateEvent);
  app.delete('/api/removeEvent', requireAuth, Event.removeEvent);

  // tour
  // tested
  app.post('/api/addTour', requireAuth, Tour.addTour);
  app.get('/api/getUserTours', requireAuth, requireAuth,Tour.getUserTours);
  app.put('/api/updateTour', requireAuth, Tour.updateTour);
  app.delete('/api/removeTour', requireAuth, Tour.removeTour);

  // Google Places API
  app.get('/api/fetchVenues/:query', requireAuth, Venue.fetchVenues);

  // Square Pay
  app.get('/api/getRevenue', Revenue.getRevenue);

  // venue - avoided as venues are created with events
  // app.post('/api/addVenue' , Venue.addVenue)
  // app.put('/api/updateVenue', Venue.updateVenue)
  // app.get('/api/getVenue', Venue.getVenue)
};
