var removeCartItemButton =document.getElementsByClassName('btn-danger')
console.log('removeCartItemButton')

for(var i = 0; i <removeCartItemButton.length; i++){
  var button =removeCartItemButtonbutton[i]
  button.addEventListener('click',function(){
       console.log('clicked')
  })
}