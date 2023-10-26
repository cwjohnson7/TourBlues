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
  try {
    const queryString = req.params.query;
    console.log('query from params request: ', req.params.query);
    const searchResults = await client.textSearch({
      params: {
        query: queryString,
        key: keys.GOOGLE_MAPS_API_KEY
      }
    });
    console.log('searchResults: ', searchResults);
    // const searchResults = Sample.sampleData;
    const trimmedResults = await searchResults.data.results.map((venue) => {
      const key = venue.place_id;
      const name = venue.name;
      const rating = venue.rating;
      const address = venue.formatted_address;
      return { key, name, address, rating };
  
    })
    res.status(200).json({ trimmedResults });
    
  } catch (error) {
    console.log(error);
  }
};
