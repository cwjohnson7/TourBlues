const axios = require('axios')
const keys = require('../../config/keys')


const squareClient = axios.create({
  baseURL: "https://connect.squareupsandbox.com/v2",
  headers: {
    "Authorization": 'Bearer ' + keys.PAYMENTS_API_ACCESS_TOKEN,
  },
})

module.exports = { squareClient }