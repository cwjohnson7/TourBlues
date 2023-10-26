const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/router');

mongoose.connect('mongodb://127.0.0.1:27017/tourblues', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on port: ', port);
