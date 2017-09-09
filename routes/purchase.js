const path = require('path');
const package = require( path.resolve( __dirname, '..', 'package.json' ) );
const configuration = require( path.resolve( __dirname, '..', 'configuration.json' ) );
const stripe = require("stripe")(configuration.stripeSecretKey);
const express = require('express');
const router = express.Router();

/* GET purchase page. */
router.post('/', function(req, res, next) {

  const token = req.body.stripeToken;
  const product = req.body.productData;
  const spot = configuration.spots.filter(i=>i.title===product.title).pop();

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

    }
  });

});

module.exports = router;
