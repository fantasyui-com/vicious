const path = require('path');
const package = require( path.resolve( __dirname, '..', 'package.json' ) );
const configuration = require( path.resolve( __dirname, '..', 'configuration.json' ) );
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('advertise', Object.assign({}, package , configuration, ));
});
module.exports = router;
