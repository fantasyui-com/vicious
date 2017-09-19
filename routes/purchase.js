const path = require('path');
const package = require( path.resolve( __dirname, '..', 'package.json' ) );
const configuration = require( path.resolve( __dirname, '..', 'configuration.json' ) );
const stripe = require("stripe")(configuration.stripeSecretKey);
const express = require('express');
const router = express.Router();

const und = require('und/smart')({});

/* GET purchase page. */
router.post('/', function(req, res, next) {

  const token = req.body.stripeToken;
  const product = req.body.productData;

  console.log(product)

  // Locate spot by the internal ".name".
  const spot = configuration.spots.filter(i => i.name===product.name ).pop();

  const spotIndex = configuration.spots.indexOf(spot);

  console.log(spot, spotIndex)

  const newData = {

    title:req.body.productData.title,
    image:req.body.productData.image,
    text:req.body.productData.text,
    url:req.body.productData.url,

  };

  const updateSpot = async function(index, data){

    const saved = await und.get( 'spot-' + index );
    const updated = Object.assign( {}, saved, data );
    await und.put( updated );

  }

  if ( ! spot.amount ) {

    updateSpot(spotIndex, newData);
    res.json({error:false, message:'Updated', paid:spot.amount});

  } else {

    const chargeObject = {
      amount: spot.amount,
      currency: configuration.currency,
      description: spot.title,
      source: token.id,
    };
    stripe.charges.create(chargeObject, function(err, charge) {
      if (err) {
        res.json({error:true, message:err.message});
      }else{

        res.json({error:false, message:(charge.outcome||{}).seller_message, paid:charge.paid});
        // TODO: next time when rendering homepage spot must reflect the changes
        updateSpot(spotIndex, newData)
      }
    });

  }

});

module.exports = router;
