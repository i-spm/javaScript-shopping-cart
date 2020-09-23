if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}
function ready() {
  var removeCartItemsButtons = document.getElementsByClassName('btn-danger')
  console.log(removeCartItemsButtons)
  for (var i = 0; i < removeCartItemsButtons.length; i++) {
    var button = removeCartItemsButtons[i]
    console.log(button)
    button.addEventListener('click', removeItemCart)

  }
  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }


  var addtoCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addtoCartButtons.length; i++) {
    var button = addtoCartButtons[i]
    button.addEventListener('click', addtoCartClicked)
  }
}

function removeItemCart(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {

  var input = event.target
  if (isNaN(input.value) || input.value < 1) {
    input.value = 1
  }
  updateCartTotal()
}

function addtoCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  console.log(price, title, imageSrc)
  addItemToCart(price, title, imageSrc)
  updateCartTotal()
}

function addItemToCart(price, title, imageSrc) {

  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  cartRow.innerText = title
  var cartItems = document.getElementsByClassName('cart-items')[0]
  cartItemsNames=cartItems.getElementsByClassName('cart-item-title')
  for(var i=0; i<cartItemsNames.length; i++){
    if(cartItemsNames[i].innerText==title){
      alert('this item is already in the cart')
      return 
    }

  }
  var cartRowContents = `
  <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
  </div>
        <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>               
  </div>`
  cartRow.innerHTML=cartRowContents
  cartItems.appendChild(cartRow)
}
function updateCartTotal() {

  var cartItemsContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemsContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {

    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

    console.log(priceElement, quantityElement)
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    console.log(price)
    var quantity = quantityElement.value
    total = total + (quantity * price)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total


}