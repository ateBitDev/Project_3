//saving repeated variables such as input refer to input fields
const $userName = $('#name');
const $userEmail = $('#mail');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $activites = $('.activities');

//appending messages
let $nameMess = $('<label></label>')
$nameMess.text('The name field cand be empty').css('color', 'red');
$nameMess.insertBefore($userName).hide();

let $emailMess = $('<label></label>')
$emailMess.text('The email field can\'t be empty and has to follow this example Example@domain.com').css('color', 'yellow');
$emailMess.insertBefore($userEmail).hide();

let $ccNumMess = $('<label></label>')
$ccNumMess.text('*Valid card informaton needed for credit card').css('color', 'green');
$ccNumMess.insertBefore($('#credit-card')).hide();

let $checkBoxMess = $('<label></label>')
$checkBoxMess.text('At least one box must be checked').css('color', 'blue');
$checkBoxMess.insertBefore($activites).hide();

let $priceLabel = $('<label></label>');
let price = 0;
$priceLabel.text(price)

$userName.attr('autofocus',true);
$('#other-title').hide();


//keeps track of job title
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
//---------------------------------------------------------------
//setting T-shirt info
//listens for a change on the design input
const designPattern = () =>
{
  if($('#design').val() !== 'js puns' && $('#design').val() !== 'heart js')
  {
  $('#colors-js-puns').hide();
  }
  else
  {
  $('#colors-js-puns').show();
  }
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

}
//-------------------------------------------------
$activites.append($priceLabel);
$priceLabel.hide();
//listener for changes on check boxes in real time (vs submit) to set price
$('.activities').on('change', function(event)
{
  $priceLabel.show();
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
  $priceLabel.hide();
  }
  $priceLabel.text(`Total: $${price}`);
})

//-----------------------------------------------
// function that keeps users from signing up for conflicting activities
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

// keeps track of paymethod in realtime
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
      $ccNumMess.hide();
    }
    else if($(event.target).val() === 'paypal')
    {
      $('#credit-card').hide();
      $('.bit').hide();
      $('.pal').show();
      $ccNumMess.hide();
    }
    else if ($(event.target).val() === 'bitcoin')
    {
      $('#credit-card').hide();
      $('.bit').show();
      $('.pal').hide();
      $ccNumMess.hide();
    }
})
//---------------------------------------------------------
// funtions that use regex to make sure input in fields meets conditons
const isValidEmail = ($userEmail) =>
{
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test($userEmail);
}

const isValidCcNum = ($ccNum) =>
{
  return /^\d{13,16}$/.test($ccNum);
}

const isValidZip = ($zip) =>
{
  return /^\d{5}$/.test($zip);
}

const isValidCvv = ($cvv) =>
{
  return /^\d{3}$/.test($cvv);
}
// function that checnks flags errors
const errorCheck = (e) =>
{
  let error = false
  anyboxes();
  $userName.css('border-color', '')
  $ccNumMess.hide();
  $nameMess.hide();
  $checkBoxMess.hide();
  if($('#name').val().length === 0 || $('#name').val() === null)
  {
    $nameMess.show();
    $userName.css('border-color', 'red')
    error = true;
  }
  if(!isValidEmail($userEmail.val()))
  {
    error = true;
  }
  if(!anyboxes())
  {
    $checkBoxMess.show();
    error = true;
  }
  if ($('#payment').val() === "credit card")
  {
    if(!isValidCcNum($ccNum.val()) || !isValidZip($zip.val()) || !isValidCvv($cvv.val()))
    {
      $ccNumMess.show();
      error = true;
    }
  }
return error;
}
// attemp at error in real time, if email is unfocused and conditons arent met message shows
$('#mail').on('change', function()
  {
    console.log('hello')
    if (isValidEmail($userEmail.val()))
    {
      $emailMess.hide();
    }
    else
    {
      $emailMess.show();
    }
})
//-----------------------------------
// function to check at least 1 box are checked
const anyboxes = () => {
let anychecked = false
let i = 0;
$('input[type=checkbox]').each(function()
{
  if($(this).prop('checked'))
  {
    i += 1;
  }
})
if(i === 0)
anychecked = false
else
anychecked = true
return anychecked
}
//listener to update design choices in real time
$('#design').change(function()
{
  designPattern();
})
designPattern();

//listener for form to see if all conditions are met by submition
$('#form').on('submit', (e) =>
{
    if (errorCheck())
    {
    e.preventDefault();
    }
    else
    {
      $('#form').unbind('submit');
    }
})
