const path = require('path');
const package = require( path.resolve( __dirname, '..', 'package.json' ) );
const configuration = require( path.resolve( __dirname, '..', 'configuration.json' ) );
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {

  const sale = [];

  configuration.spots.forEach((spot, index)=>{
    sale.push( Object.assign({}, spot, configuration.items[index]) )
  })

  // TODO: change spot information HERE.

  res.render('advertise', Object.assign({sale}, package , configuration, ));

});
module.exports = router;
