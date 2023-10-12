
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
    res.status(200).send({ tour, result });
  })
}

exports.getUserTours = async (req, res) => {
  try {
    const artistId  = req.params.artist;

    // console.log('req.params', req.params);
    // ^^ will instead probably use req.user.artistId to grab artist Id and then search for tours associated w/ that artist; can populate lineups/events here or do subsequent get requests for each time user navigates to drill down to the same
    const tours = await Tour.find({ artist: artistId })
    // console.log('tours response ', tours);
    .populate({
      path: 'events',
      model: 'event',
      populate: [
        {
          path: 'venue',
          model: 'venue'
        },
        {
          path: 'lineup',
          model: 'artist'
        }
      ]
    });
    res.status(200).send({ tours });
  } catch (err){
    throw err;
  }
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