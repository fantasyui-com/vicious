
$('.btn-stripe').click(function() {

  $(this).attr('disabled', true);

  setTimeout(function(){ $(this).attr('disabled', false); }.bind(this),3000)

  // Product Data based on button data
  var cardId = $(this).data('card');
  var formId = $(this).data('form');

  var productData = {};

  productData.image = $("#"+formId + "-image" ).val();
  productData.text = $("#"+formId + "-text" ).val();
  productData.title = $(this).data('title');
  productData.amount = $(this).data('amount');
  productData.name = $(this).data('name');
  productData.description = $(this).data('description');

  console.log(productData)

  // Open Checkout with further options:
  var stripeCheckout = StripeCheckout.configure({

    key: $("meta[name='stripe-public-key']").prop('content'),
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {

      $.ajax({
          type: 'POST',
          url: '/purchase',
          data: JSON.stringify({
            stripeToken:token,
            productData:productData
          }),
          success: function(data) {
            // ... //
            console.log(data);

            if(data.error){

              alert(error.mesage);

            }else{

              window.location.replace($("meta[name='website-address']").prop('content'))
              $("#"+cardId).removeClass('bg-primary');
              $("#"+cardId).addClass('bg-warning');

            }
          },
          contentType: "application/json",
          dataType: 'json'
      });

    }

  });

  // Close Checkout on page navigation:
  $(window).bind('popstate', function(event) {
    stripeCheckout.close();
  });

  // trigger stripe
  stripeCheckout.open({
    amount: productData.amount,
    name: productData.name,
    description: productData.description,
    zipCode: true,
  });


});
