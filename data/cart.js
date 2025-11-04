export let cart = JSON.parse(localStorage.getItem('cart')) ||[{
  deliveryOptionId:'1',
},{
  deliveryOptionId:'2'
}];
export function loadCartFromStorage() {
  // re-read storage and update exported binding
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart;
}
export function calculateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;

     
    });
    return cartQuantity;
 }  
export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}
export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem) =>{
    if(cartItem.productId !==productId){
      newCart.push(cartItem)
    }
  });
  cart = newCart

  saveToStorage();
}