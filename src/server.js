'use strict';

const express = require('express');
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const dogRoutes = require('./routes/dog.js');
const birdRoutes = require('./routes/bird.js');
const app = express();

app.use(express.json());
app.use(dogRoutes);
app.use(birdRoutes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app: app,
  start: port => {
    app.listen(port, () => {
      console.log(`listening on port: ${port}`);
    });
  }
};
