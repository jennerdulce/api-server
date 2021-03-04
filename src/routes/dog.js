'use strict';

const express = require('express');
const dogSchema = require('../models/dog.js'); // collection
const Dogs = require('../models/data-collection-class.js'); // wrapper
const dogs = new Dogs(dogSchema);

const dogRoute = express.Router();

dogRoute.get('/dog', getDogs);
dogRoute.get('/dog/:id', getDog);
dogRoute.post('/dog', createDog);
dogRoute.put('/dog/:id', updateDog);
dogRoute.delete('/dog/:id', deleteDog);

async function getDogs(req, res) {
  let all = await dogs.read();
  res.status(200).json(all);
}

async function getDog(req, res) {
  let id = req.params.id;
  let dog = await dogs.read(id);
  res.status(200).json(dog);
}

async function createDog(req, res) {
  let obj = req.body;
  console.log(obj);
  let newDog = await dogs.create(obj);
  res.status(201).json(newDog);
}

async function updateDog(req, res) {
  let id = req.params.id;
  let content = req.body;
  let updated = await dogs.update(id, content);
  res.status(200).send(updated);
}

async function deleteDog(req, res) {
  let id = req.params.id;
  let deleted = await dogs.delete(id);
  res.status(204).send('Dog successfully deleted..');
}

module.exports = dogRoute;