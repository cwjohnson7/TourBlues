const Artist = require('../models/artist');
const Event = require('../models/event');

exports.addArtist = async (req, res) => {
  const { name, contact, email, handle, phone } = req.body;

  const existingArtist = await Artist.findOne({ name });
  if (!existingArtist || existingArtist.handle !== handle) {
    const newArtist = new Artist({
      name,
      contact,
      email,
      handle,
      phone,
    });
    await newArtist.save();
    return res.status(200).send({ newArtist });
  }
  return res
    .status(422)
    .send({ error: 'Artist name or handle already in use' });
};

exports.addLineupArtist = async (req, res) => {
  const { tourId, eventId, name, contact, email, handle, phone } = req.body;
  // tour and event ID's should be accessible from addEvent response prior to using this function

  const existingArtist = await Artist.findOne({ name });
  const event = await Event.findById(eventId);
  if (!existingArtist) {
    const lineupArtist = new Artist({
      name,
      contact,
      email,
      handle,
      phone,
    });
    event.lineup.push(lineupArtist._id);
    lineupArtist.tours.push(tourId);
    lineupArtist.events.push(eventId);
    await event.save();
    await lineupArtist.save();
    // console.log(req.body);
    res.status(200).send({ lineupArtist, tourId, eventId });
  } else {
    existingArtist.tours.push(tourId);
    existingArtist.events.push(eventId);
    event.lineup.push(existingArtist._id);
    await existingArtist.save();
    await event.save();
    // console.log(req.body);
    res.status(200).send({ existingArtist, tourId, eventId });
  }
};

exports.getArtistById = async (req, res) => {
  const { artistId } = req.body;

  const artist = await Artist.findById(artistId);

  res.status(200).send({ artist });
};

// need to test this route
exports.updateArtist = async (req, res) => {
  const { artistId, name, contact, email, handle, phone } = req.body;

  const updatedArtist = await Artist.findById(artistId);
  updatedArtist.name = name;
  updatedArtist.contact = contact;
  updatedArtist.email = email;
  updatedArtist.handle = handle;
  updatedArtist.phone = phone;
  await updatedArtist.save();

  res.status(200).send({ updatedArtist, artistId });
};

exports.removeArtist = async (req, res) => {
  const { artistId } = req.body;
  const id = artistId;
  const removedArtist = await Artist.findByIdAndRemove(id);

  res.status(200).send({ removedArtist });
};

exports.removeLineupArtist = async (req, res) => {
  const { artistId, eventId } = req.body;

  const removedLineupArtist = await Artist.findById(artistId);
  const event = await Event.findById(eventId);
  const artistIndex = await event.lineup.indexOf(removedLineupArtist._id);

  event.lineup.splice(artistIndex, 1);
  await event.save();

  res.status(200).send({ removedLineupArtist, event });
};

exports.getArtist = async (req, res) => {
  const { artistId, name } = req.body;
  if (artistId) {
    const artist = await Artist.findById(artistId);
    return res.status(200).send({ artist, message: 'artistId used' });
  }
  if (name) {
    const artist = await Artist.findOne({ name });
    return res.status(200).send({ artist, message: 'name used' });
  }
  return res.status(404).send({ error: 'artist not found' });
};
