
const Artist = require('../models/artist');
const Event = require('../models/event');
const Tour = require('../models/tour');
const Venue = require('../models/venue');

exports.addEvent = async (req, res) => {
  const { artistId, tourId, venueName, address, contact, phone, email, date, doors, setLength } = req.body;
  const id = artistId;
  const artist = await Artist.findById(id);
  const tour = await Tour.findById(tourId);
  const existingVenue = await Venue.findOne({name: venueName});
  if(!existingVenue) {
    const venue = new Venue({
      name: venueName,
      address: address,
      contact: contact,
      phone: phone,
      email: email
    })

    const event = new Event({
      artist: artist._id,
      venue: venue._id,
      tour: tour._id,
      date: date,
      doors: doors,
      setLength: setLength
    });
    await venue.save();
    event.lineup.push(artistId);
    await event.save();
    artist.events.push(event);
    await artist.save();
    tour.events.push(event);
    await tour.save();
   
    res.status(200).send({ event, venue, artistId })
  }

  const event = new Event({
    artist: artist._id,
    venue: existingVenue._id,
    tour: tour._id,
    date: date,
    doors: doors,
    setLength: setLength
  });
  event.lineup.push(artistId);
  await event.save();
  artist.events.push(event);
  await artist.save();
  tour.events.push(event);
  await tour.save();
  res.status(200).send({ event, existingVenue, artistId })
}

exports.getEventsByTour = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    // ^^ will instead probably use req.user.artistId to grab artist Id and then search for tours associated w/ that artist; can populate lineups/events here or do subsequent get requests for each time user navigates to drill down to the same
    const events = await Event.find({ tour: tourId })
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
  } catch (err) {
    throw err;
  }
}

exports.getEventById = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    res.status(200).send({ event });
  } catch(error) {
    throw error;
  }
}

exports.updateEvent = async (req, res) => {
  const { newDate, newDoors, newSetLength, eventId } = req.body;
  const id = eventId;
  const updatedEvent = await Event.findById(id)
  console.log(updatedEvent);
  updatedEvent.date = newDate;
  updatedEvent.doors = newDoors;
  updatedEvent.setLength = newSetLength;
 
  await updatedEvent.save()
  res.status(200).send({updatedEvent})
}

exports.removeEvent = async (req, res) => {
  const { eventId } = req.body;
  const id = eventId;
  // const removedEvent = await Event.findByIdAndDelete(id);
  const removedEvent = await Event.findById(eventId);
  const artistRef = await Artist.findById(removedEvent.artist);
  const tourRef = await Tour.findById(removedEvent.tour);
  await Event.findByIdAndDelete(eventId);

  const eventIndexForArtist = artistRef.events.indexOf(eventId);
  const eventIndexForTour = tourRef.events.indexOf(eventId);

  artistRef.events.splice(eventIndexForArtist, 1);
  tourRef.events.splice(eventIndexForTour, 1);

  await artistRef.save();
  await tourRef.save();

  res.status(200).send({ removedEvent, artistRef, tourRef })
}

