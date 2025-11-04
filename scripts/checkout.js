import { cart, removeFromCart,calculateCartQuantity,loadCartFromStorage, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";  
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js'
const today  = dayjs()
const deliveryDate = today.add(7,'days')
console.log(deliveryDate.format('dddd, MMMM D'))
 
loadCartFromStorage();
let cartSummaryHtml = "";
cart.forEach((cartItem)=>{

  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product)=>{ 
    if(product.id === productId){
      matchingProduct = product;
    }
  });

  console.log(matchingProduct);

 cartSummaryHtml += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name} 
                </div>
                <div class="product-price">
                  $${(formatCurrency(matchingProduct.priceCents)) }
                </div>
                <div class="product-quantity">
                  <span >
                    Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = ${matchingProduct.id}>
                    Update
                  </span>
                  <input class = "quantity-input js-quantity-input">
                  <span class = "save-quantity-link js-save-link" data-product-id = ${matchingProduct.id}>Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct)}
              </div>
            </div>
          </div>`
});
//console.log(cartSummaryHtml)
 function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-carts-quantity").innerHTML = `Checkout(${cartQuantity} items)`;
}
updateCartQuantity();
document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml
 

// When user clicks "Update"
document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    // Enter editing mode
    container.classList.add("is-editing-quantity");
    const input = container.querySelector('.js-quantity-input');
    const quantityLabel = container.querySelector('.js-quantity-label');
    // Hide quantity text + update link
    const newQuantity = Number(input.value);
   input.style.display = 'none';
   quantityLabel.style.display = 'none'
    container.querySelector('.js-update-link').style.display = 'none';

    // Show input + save link
   input.style.display = 'inline';
    container.querySelector('.js-save-link').style.display = 'inline';

  });
});

// When user clicks "Save"
document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    const input = container.querySelector('.js-quantity-input');
    const quantityLabel = container.querySelector('.js-quantity-label');

    // Exit editing mode
    container.classList.remove("is-editing-quantity");

    const newQuantity = Number(input.value);

    const cartItem = cart.find(item => item.productId === productId);
    if (isNaN(newQuantity) || newQuantity < 1 || newQuantity > 999) {
  alert("Please enter a valid quantity between 1 and 999.");
  input.value = cartItem.quantity; // Reset to previous value
  return;
}
    cartItem.quantity = newQuantity
    quantityLabel.innerText = newQuantity;
    saveToStorage()
    updateCartQuantity()
    // Show quantity label + update link again
    quantityLabel.style.display = 'inline';
    container.querySelector('.js-update-link').style.display = 'inline';

    // Hide input + save link
    input.style.display = 'none';
    container.querySelector('.js-save-link').style.display = 'none';
  });
});

 document.querySelectorAll('.js-quantity-input').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      input.closest(".cart-item-container").querySelector(".js-save-link").click();
    }
  });
});
  
function deliveryOptionsHTML(matchingProduct){
  deliveryOptions.forEach(()=>{
    let Html = '';


    const today = dayjs();
    const deliveryDate = today.add(deliveryOptions.deliveryDays,'days')
    const dateString = deliveryDate.format('dddd, MMMM D')

    const priceString = deliveryOptions.priceCents === 0 ? 'FREE':`$${formatCurrency(deliveryOptions.priceCents)} -`
    
    Html= `
     <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
            ${dateString}
        </div>
        <div class="delivery-option-price">
       ${priceString} - Shipping
        </div>
      </div>
      </div>
    `
  });
  return Html;
}
//s