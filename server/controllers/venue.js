const Venue = require('../models/venue');

exports.addVenue = async (req, res) => {
  const { name, address, contact, phone, email, completed } = req.body;

  res.status(200).send(req.body);
}