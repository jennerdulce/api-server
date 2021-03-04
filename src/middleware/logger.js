'use strict';

module.exports = (req, res, next) => {
  res.status(200).send(
    console.log(`PATH: ${req.path}`),
    console.log(`METHOD: ${req.method}`)
  );
};
