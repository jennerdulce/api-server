'use strict';

const express = require('express');
const birdSchema = require('../models/bird.js');
const Birds = require('../models/data-collection-class.js');
const birds = new Birds(birdSchema);

const birdRoute = express.Router();

birdRoute.get('/bird', getBirds);
birdRoute.get('/bird/:id', getBird);
birdRoute.post('/bird', createBird);
birdRoute.put('/bird/:id', updateBird);
birdRoute.delete('/bird/:id', deleteBird);

async function getBirds(req, res) {
  let all = await birds.read();
  res.status(200).json(all);
}

async function getBird(req, res) {
  let id = req.params.id;
  let bird = await birds.read(id);
  res.status(200).json(bird);
}

async function createBird(req, res) {
  let obj = req.body;
  console.log(obj);
  let newBird = await birds.create(obj);
  res.status(201).json(newBird);
}

async function updateBird(req, res) {
  let id = req.params.id;
  let content = req.body;
  let updated = await birds.update(id, content);
  res.status(200).send(updated);
}

async function deleteBird(req, res) {
  let id = req.params.id;
  let deleted = await birds.delete(id);
  res.status(204).send('Bird successfully deleted..');
}

module.exports = birdRoute;