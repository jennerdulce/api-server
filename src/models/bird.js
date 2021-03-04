'use strict';

const mongoose = require('mongoose');

const birdSchema = mongoose.Schema({
  type: { type: String, required: true},
  color: { type: String, required: true},
  age: { type: Number, required: true}
});

// ultimately creates a collection/table with this structure
const birdModel = mongoose.model('bird', birdSchema);

module.exports = birdModel;
