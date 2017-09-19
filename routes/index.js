const path = require('path');
const package = require( path.resolve( __dirname, '..', 'package.json' ) );
const configuration = require( path.resolve( __dirname, '..', 'configuration.json' ) );
const express = require('express');
const router = express.Router();

const und = require('und/smart')({});

/* GET home page. */
router.get('/', function(req, res, next) {

  const sale = [];

  configuration.spots.forEach((spot, index)=>{
    sale.push( Object.assign({}, spot, configuration.items[index]) )
  })

  sale.forEach( async (spot, index) => {
    const saved = await und.get( 'spot-' + index );
    Object.assign( spot, saved );
  })

  res.render('index', Object.assign({sale}, package , configuration, ));

});

module.exports = router;
