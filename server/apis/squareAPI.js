const { squareClient } = require('./configs/axiosClients')

const SquareAPI =  {
  get: async () => {
    const response = await squareClient.request({
      url: '/payments',
      method: "GET",
    })

    return response.data
  }
}

module.exports = { SquareAPI }