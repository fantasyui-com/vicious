
$('.btn-free').click(function() {

  $(this).attr('disabled', true);
  setTimeout(function(){ $(this).attr('disabled', false); }.bind(this), 3000)

  // Product Data based on button data
  var cardId = $(this).data('card');
  var formId = $(this).data('form');

  var productData = {};

  // Editable by user
  productData.title = $("#"+formId + "-title" ).val();
  productData.image = $("#"+formId + "-image" ).val();
  productData.text = $("#"+formId + "-text" ).val();
  productData.url = $("#"+formId + "-url" ).val();

  // hardcoded, name is used for looking up product on server
  productData.name = $(this).data('name');

  console.log(productData)

  $.ajax({

      type: 'POST',
      url: '/purchase',
      data: JSON.stringify({
        stripeToken:null,
        productData:productData
      }),

      success: function(data) {
        // ... //
        console.log(data);

        if(data.error){

          alert(error.mesage);

        }else{

          //window.location.replace($("meta[name='website-address']").prop('content'))
          $("#"+cardId).removeClass('bg-primary');
          $("#"+cardId).addClass('bg-success');

        }
      },
      contentType: "application/json",
      dataType: 'json'
  });


});
