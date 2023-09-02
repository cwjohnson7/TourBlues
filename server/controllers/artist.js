const Artist = require('../models/artist');


exports.addCurrentArtist = async (req, res) => {
  const { name, contact, email, handle, phone } = req.body;

  res.status(200).send(req.body)
}

exports.addLineupArtist = async (req, res) => {
  const { name, contact, email, handle, phone } = req.body;
  // console.log(req.body);
  res.status(200).send(req.body)
}

exports.updateArtist = async (req, res) => {
  const { name, contact, email, handle, phone } = req.body;
  res.status(200).send(req.body);
}