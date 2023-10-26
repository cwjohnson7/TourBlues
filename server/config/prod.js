// production config
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  PAYMENTS_API_ACCESS_TOKEN: process.env.PAYMENTS_API_ACCESS_TOKEN,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
};
