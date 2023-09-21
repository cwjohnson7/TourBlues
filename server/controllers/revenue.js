const axios = require('axios');
const { json } = require('body-parser');
const keys = require('../config/keys');
const { SquareAPI } = require('../apis/squareAPI');

const paymentsApi = 'https://connect.squareupsandbox.com/v2/payments';

exports.getRevenue = async (req, res) => {
  try {
    const payments = await SquareAPI.get()
    
    res.status(200).send({ payments })
  } catch (err) {
    console.log(err);
  }
}