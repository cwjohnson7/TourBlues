const { Client } = require('@googlemaps/google-maps-services-js');
const keys = require('../config/keys');
const Sample = require('../models/sample-data');
const Venue = require('../models/venue');

const client = new Client({});

exports.addVenue = async (req, res) => {
  const { name, address, city, state, zip, contact, phone, email, completed } =
    req.body;

  res.status(200).send(req.body);
};

exports.fetchVenues = async (req, res) => {
  const queryString = req.params.query;
  console.log('query from params request: ', req.params.query);
  // const searchResults = await client.textSearch({
  //   params: {
  //     query: queryString,
  //     key: keys.GOOGLE_MAPS_API_KEY
  //   }
  // });

  const searchResults = Sample.sampleData;
  // console.log('searchResults: ', searchResults);

  res.status(200).send({ searchResults });
};
