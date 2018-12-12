$('#name').attr('autofocus',true);

$('#other-title').hide();
$('#title').change(function()
{
if($('#title').val() !== 'other')
{
  $('#other-title').hide();
}
else
{
  $('#other-title').show();
}});
//---------------------------------------------------------------//
//setting T-shirt info
//listens for a change on the design input
$('#design').change(function()
{
//compares the designs new value to the first design optons
  if ($('#design').val() === 'js puns')
  {
    //sets the option of the first avabile option for js puns
  $('#colors-js-puns select').val('cornflowerblue')
  $('#color > option').each(function()
  {
    //shows what options are avabile for puns
    if($(this).text().includes('(JS Puns shirt only)'))
      {
    $(this).show();
      }
      else
      {
          $(this).hide();
      }
    })
}
// does the opposite of the if for second option
else
{
  //sets the option to the frist availabel option for heart js
  $('#colors-js-puns select').val('tomato')
$('#color > option').each(function()
{
  //hides the js pun options
  if($(this).text().includes('(JS Puns shirt only)'))
    {

  $(this).hide();
    }
    else
    {
        $(this).show();
    }
  })}
});
//-------------------------------------------------//

let priceLabel = $('<label></label>').attr('id', 'price');
let price = 0;
priceLabel.text(price)

$('.activities').append(priceLabel);
$('#price').hide();
$('.activities').on('change', function(event)
{
  $('#price').show();
  if($(event.target).prop('checked') && $(event.target).attr('name') === 'all')
  {
    price += 200;
  }
  else if (!($(event.target).prop('checked')) && $(event.target).attr('name') === 'all')
  {
    price -= 200;
  }
  else if($(event.target).prop('checked'))
  {
  price += 100;
  console.log($(event.target));
  disableCheckbox('js-frameworks','express')
  disableCheckbox('js-libs', 'node');
  }

  else
  {
    disableCheckbox('js-frameworks','express')
    disableCheckbox('js-libs', 'node');
  price-=100;
  }

  if (price === 0)
  {
  $('#price').hide();
  }
  $('#price').text(`$${price}`);
})

//-----------------------------------------------

const disableCheckbox = (name1, name2) =>
{
    if($(`input[name="${name1}"]`).is(':checked'))
    {
      $(`input[name="${name2}"]`).attr('disabled', true).parent().css('color', 'grey')
    }
    else if($(`input[name="${name2}"]`).is(':checked'))
    {
      $(`input[name="${name1}"]`).attr('disabled', true).parent().css('color', 'grey')
    }
    else
    {
      $(`input[name="${name2}"]`).removeAttr('disabled').parent().css('color', 'black')
      $(`input[name="${name1}"]`).removeAttr('disabled').parent().css('color', 'black')
    }
}
//---------------------------------------------------
$('#payment').val("credit card");
$('.pal').hide();
$('.bit').hide();

$('#payment').change(function(event)
{
    if ($(event.target).val() === 'credit card')
    {
      $('#credit-card').show();
      $('.pal').hide();
      $('.bit').hide();
    }
    else if($(event.target).val() === 'select_method')
    {
      $('#payment').val("credit card");
      $('#credit-card').show();
      $('.pal').hide();
      $('.bit').hide();

    }
    else if($(event.target).val() === 'paypal')
    {
      $('#credit-card').hide();
      $('.bit').hide();
      $('.pal').show();
    }
    else if ($(event.target).val() === 'bitcoin')
    {
      $('#credit-card').hide();
      $('.bit').show();
      $('.pal').hide();
    }
})
