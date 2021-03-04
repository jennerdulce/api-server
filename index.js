'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;

const MONGODB_URL = 'mongodb://localhost:27017/lab4DB';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGODB_URL, options)
  .then(() => {
    server.start(PORT);
  })
  .catch(err => console.error(err));
