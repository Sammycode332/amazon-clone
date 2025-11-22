import { products } from './products.js';
// when creating function that re object use pascal case


class Cart {
  // # makes the key private in a class so it cant be tampered outside the class
  //it will make it a private property
    #localStorageKey ;
    cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ||[{
  deliveryOptionId:'1',
},{
  deliveryOptionId:'2'
},{
  deliveryOptionId:'3'
}];
constructor(localStorageKey) {
  this.#localStorageKey =  localStorageKey;
}
 #loadCartFromStorage() {
  // re-read storage and update exported binding
  this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  return this.cartItems;
};
saveToStorage(){
  localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems))
};
 calculateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;

     
    });
    return cartQuantity;
 };
   updateCartQuantity(){
      const cartQuantity = calculateCartQuantity();
      document.querySelector(".js-carts-quantity").innerHTML = `Checkout(${cartQuantity} items)`;
    };
removeFromCart(productId){
  const newCart = [];
  this.cartItems.forEach((cartItem) =>{
    if(cartItem.productId !==productId){
      newCart.push(cartItem)
    }
  });
  this.cartItems = newCart 

  this.saveToStorage();
};
updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem; 
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionId  = deliveryOptionId;

    this.saveToStorage();
 };
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(businessCart)


