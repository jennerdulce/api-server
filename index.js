'use strict';

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;

const MONGODB_URL = 'mongodb+srv://jennercf:1234@cluster0.nx7ji.mongodb.net/Cluster0?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGODB_URL, options)
  .then(() => {
    server.start(PORT);
  })
  .catch(err => console.error(err));
