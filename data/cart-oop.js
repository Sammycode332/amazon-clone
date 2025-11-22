import { products } from './products.js';
// when creating function that re object use pascal case


function Cart(localStorageKey){
    const cart = {
  cartItems : JSON.parse(localStorage.getItem(localStorageKey)) ||[{
  deliveryOptionId:'1',
},{
  deliveryOptionId:'2'
},{
  deliveryOptionId:'3'
}
],
 loadCartFromStorage() {
  // re-read storage and update exported binding
  this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  return this.cartItems;
},
saveToStorage(){
  localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems))
},
 calculateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;

     
    });
    return cartQuantity;
 },
   updateCartQuantity(){
      const cartQuantity = calculateCartQuantity();
      document.querySelector(".js-carts-quantity").innerHTML = `Checkout(${cartQuantity} items)`;
    },
 removeFromCart(productId){
  const newCart = [];
  this.cartItems.forEach((cartItem) =>{
    if(cartItem.productId !==productId){
      newCart.push(cartItem)
    }
  });
  this.cartItems = newCart 

  this.saveToStorage();
},

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem; 
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionId  = deliveryOptionId;

    this.saveToStorage();
 } 
};
  return cart;
}

const cart = Cart('cart-oop');
const buisnessCart = Cart('cart-business');
console.log(cart)
console.log(buisnessCart)


