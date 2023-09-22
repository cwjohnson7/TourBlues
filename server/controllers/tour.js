
const Artist = require('../models/artist');
const Tour = require('../models/tour');

exports.addTour = async (req, res) => {
  const { name, artistId } = req.body;
  const id = artistId;
  Artist.findById(id)
  .then((result) => {
    const tour = new Tour({
      name: name,
      artist: result._id
    });
    tour.save();
    result.tours.push(tour);
    result.save();
    res.status(200).send({ tour, result })
  })
}

exports.updateTour = async (req, res) => {
  const { updatedName, tourId } = req.body;
  const id = tourId;
  updatedTour = await Tour.findById(id)
  updatedTour.name = updatedName;
  await updatedTour.save()
  res.status(200).send({ updatedTour })
}

exports.removeTour = async (req, res) => {
  const { tourId } = req.body;
  const id = tourId;
  const removedTour = await Tour.findByIdAndRemove(id);
  const artistRef = await Artist.findById(removedTour.artist);
  const eventIndexForArtist = artistRef.tours.indexOf(tourId);
  console.log('eventIndexforArtist: ', eventIndexForArtist);
  artistRef.tours.splice(eventIndexForArtist, 1);
  await artistRef.save();
  res.status(200).send({ removedTour, artistRef });
}