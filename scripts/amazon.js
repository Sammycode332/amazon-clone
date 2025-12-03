import { cart,saveToStorage,calculateCartQuantity,loadCartFromStorage} from "../data/cart.js";
import { products,loadProducts } from "../data/products.js"
import { formatCurrency } from "./utils/money.js";


loadProducts(renderProductsGrid); 
loadCartFromStorage();

function renderProductsGrid(){
   const cartQuantityElem = document.querySelector('.js-cart-quantity');
   if (cartQuantityElem) {
     const initialCount = calculateCartQuantity();
     cartQuantityElem.innerHTML = initialCount === 0 ? '' : initialCount;
   }
   
   let productsHtml = '';
   
   
   products.forEach((product) => {
     productsHtml += `
       <div class="product-container">
         <div class="product-image-container">
           <img class="product-image" src="${product.image}">
         </div>
   
         <div class="product-name limit-text-to-2-lines">
           ${product.name}
         </div>
   
         <div class="product-rating-container">
           <img class="product-rating-stars"
             src="${product.getStarsUrl() }">
           <div class="product-rating-count link-primary">
             ${product.rating.count}
           </div>
         </div>
   
         <div class="product-price">
           ${product.getPrice()}
         </div> 
    
         <div class="product-quantity-container">
           <select class="js-quantity-selector-${product.id}">
             <option selected value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>    
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
             <option value="7">7</option>
             <option value="8">8</option>
             <option value="9">9</option>
             <option value="10">10</option>
           </select>
         </div>
   
         ${product.extraInfoHTML()}
   
         <div class="added-to-cart js-add-message">
           <img src="images/icons/checkmark.png">
           Added
         </div>
   
         <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
           Add to Cart
         </button>
       </div>`;
   });
   document.querySelector('.js-products-grid').innerHTML = productsHtml;
   
   
   const hideMessageTimeouts = {}
   document .querySelectorAll('.js-add-to-cart').forEach((button) => {
     button.addEventListener('click', () => {
       const { productId } = button.dataset;
        
        
       const selector = document.querySelector(`.js-quantity-selector-${productId}`);
       const quantitySelected = Number(selector.value);
   
      
      let matchingItem; 
       cart.forEach((item) => {
         if (productId === item.productId) {
           matchingItem = item;
         }
       });
   
     
       if (matchingItem) {
         matchingItem.quantity += quantitySelected;
       } else {
         cart.push({
           productId,quantity: quantitySelected,
           deliveryOptionId: '1'
         });
         
       }
       saveToStorage();
       const newCount = calculateCartQuantity();
   cartQuantityElem.innerHTML = newCount === 0 ? '' : newCount;
   
   
     
       const productContainer = button.closest('.product-container')
       const added = productContainer.querySelector('.js-add-message')
   
         added.classList.add('Added')
   
   
         if(hideMessageTimeouts[productId]){
           clearTimeout(hideMessageTimeouts[productId])
         }
          added.classList.add('Added');
          hideMessageTimeouts[productId] = setTimeout(() => {
           added.classList.remove('Added')
         }, 2000);
         
   
       console.log(`Cart updated:`, cart);
     });
   });
}