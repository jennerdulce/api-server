'use strict';

const mongoose = require('mongoose');

const dogSchema = mongoose.Schema({
  name: { type: String, required: true},
  breed: { type: String, required: true},
  age: { type: Number, required: true}
});

// ultimately creates a collection/table with this structure
const dogModel = mongoose.model('dog', dogSchema);

module.exports = dogModel;
