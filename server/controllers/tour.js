const Artist = require('../models/artist');
const Tour = require('../models/tour');

exports.addTour = async (req, res) => {
  const { name, artistId } = req.body;
  const id = artistId;
  Artist.findById(id).then((result) => {
    const tour = new Tour({
      name,
      artist: result._id,
    });
    tour.save();
    result.tours.push(tour);
    result.save();
    res.status(200).send({ tour, result });
  });
};

exports.getUserTours = async (req, res) => {
  // const artistId = req.params.artist;
  const artistId = req.user.artistId;
  console.log('artistId from route: ', artistId);

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
          model: 'venue',
        },
        {
          path: 'lineup',
          model: 'artist',
        },
      ],
    });
  res.status(200).send({ tours });
};

exports.updateTour = async (req, res) => {
  const { newName, tourId } = req.body;
  const id = tourId;
  const updatedTour = await Tour.findById(id);
  updatedTour.name = newName;
  await updatedTour.save();
  console.log('updated tour in object: ', { updatedTour });
  res.status(200).send({ updatedTour });
};

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
};
