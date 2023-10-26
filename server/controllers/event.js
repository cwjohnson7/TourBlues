const Artist = require('../models/artist');
const Event = require('../models/event');
const Tour = require('../models/tour');
const Venue = require('../models/venue');

exports.addEvent = async (req, res) => {
  const {
    artistId,
    tourId,
    venueName,
    address,
    city,
    state,
    zip,
    contact,
    phone,
    email,
    date,
    doors,
    setLength,
  } = req.body;
  console.log('req.body from server: ', req.body);
  const id = artistId;
  const artist = await Artist.findById(id);
  const tour = await Tour.findById(tourId);
  const existingVenue = await Venue.findOne({ name: venueName });
  if (!existingVenue) {
    const venue = new Venue({
      name: venueName,
      address,
      city,
      state,
      zip,
      contact,
      phone,
      email,
    });

    const event = new Event({
      artist: artist._id,
      venue: venue._id,
      tour: tour._id,
      date,
      doors,
      setLength,
    });
    await venue.save();
    event.lineup.push(artistId);
    await event.save();
    artist.events.push(event);
    await artist.save();
    tour.events.push(event);
    await tour.save();

    const lineupData = await event.populate({
      path: 'lineup',
      model: 'artist',
    });
    const { lineup } = lineupData;

    res.status(200).send({ event, lineup, venue, artistId });
  } else {
    const event = new Event({
      artist: artist._id,
      venue: existingVenue._id,
      tour: tour._id,
      date,
      doors,
      setLength,
    });
    event.lineup.push(artistId);
    await event.save();
    artist.events.push(event);
    await artist.save();
    tour.events.push(event);
    await tour.save();
    const lineupData = await event.populate({
      path: 'lineup',
      model: 'artist',
    });
    const { lineup } = lineupData;
    res.status(200).send({ event, lineup, existingVenue, artistId });
  }
};

exports.getEventsByTour = async (req, res) => {
  const { tourId } = req.params;
  // ^^ will instead probably use req.user.artistId to grab artist Id and then search for tours associated w/ that artist; can populate lineups/events here or do subsequent get requests for each time user navigates to drill down to the same
  const events = await Event.find({ tour: tourId });
  // .populate({
  //   path: 'events',
  //   model: 'event',
  //   populate: [
  //     {
  //       path: 'venue',
  //       model: 'venue'
  //     },
  //     {
  //       path: 'lineup',
  //       model: 'artist'
  //     }
  //   ]
  // });
  res.status(200).send({ events });
};

exports.getEventById = async (req, res) => {
  const { eventId } = req.body;
  const event = await Event.findById(eventId);
  const venueData = await event.populate({
    path: 'venue',
    model: 'venue',
  });
  const { venue } = venueData;

  res.status(200).send({ event, venue });
};

exports.updateEvent = async (req, res) => {
  const {
    newDate,
    newDoors,
    newSetLength,
    newVenueName,
    newAddress,
    newCity,
    newState,
    newZip,
    newContact,
    newPhone,
    newEmail,
    eventId,
    venueId,
    artistId
  } = req.body;
  const id = eventId;
  const updatedEvent = await Event.findById(id);
  const updatedVenue = await Venue.findById(venueId);
  console.log(updatedEvent);
  // if(newDate) {
    updatedEvent.date = newDate;
  // }
  // if (newDoors) {
    updatedEvent.doors = newDoors;
  // }
  // if (newSetLength) {
    updatedEvent.setLength = newSetLength;
  // }
  // if (newVenueName) {
    updatedVenue.name = newVenueName;
  // }
  // if (newAddress) {
    updatedVenue.address = newAddress;
  // }
  // if (newCity) {
    updatedVenue.city = newCity;
  // }
  // if (newState) {
    updatedVenue.state = newState;
  // }
  // if (newZip) {
    updatedVenue.zip = newZip;
  // }
  // if (newContact) {
    updatedVenue.contact = newContact;
  // }
  // if (newPhone) {
    updatedVenue.phone = newPhone;
  // }
  // if (newEmail) {
    updatedVenue.email = newEmail;
  // }
  
  await updatedEvent.save();
  await updatedVenue.save();
  res.status(200).send({ artistId, eventId, venueId, updatedEvent, updatedVenue });
};

exports.removeEvent = async (req, res) => {
  const { eventId } = req.body;
  console.log(' removeEvent req.body: ', req.body);
  const id = eventId;
  // const removedEvent = await Event.findByIdAndDelete(id);
  const removedEvent = await Event.findById(id);
  console.log('removedEvent: ', removedEvent);
  const artistRef = await Artist.findById(removedEvent.artist);
  console.log('artistRef: ', artistRef);
  const tourRef = await Tour.findById(removedEvent.tour);
  console.log('tourRef: ', tourRef);
  await Event.findByIdAndDelete(eventId);

  const eventIndexForArtist = artistRef.events.indexOf(eventId);
  const eventIndexForTour = tourRef.events.indexOf(eventId);

  artistRef.events.splice(eventIndexForArtist, 1);
  tourRef.events.splice(eventIndexForTour, 1);

  await artistRef.save();
  await tourRef.save();

  res.status(200).send({ eventId, removedEvent, artistRef, tourRef });
};
