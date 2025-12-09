import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {orders,loadOrders } from "../../data/orders.js";
import { formatCurrency } from "../utils/money.js";
import { getProduct } from '../data/products.js';
import { cart,updateCartQuantity,calculateCartQuantity,} from '../data/cart.js';
loadOrders(); 
//renderOrders();
const today = dayjs();
const todayFormatted = today.format('MMMM,D');
console.log(todayFormatted);
function renderOrders(){
  const container = document.querySelector('.js-orders-grid');
  let ordersHTML = '';
  orders.forEach(orders=>{
    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${todayFormatted}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(orders.totalCostCents)}</
            </div>
          </div> 

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${order.products.map(item => {
            const product = getProduct(item.productId);
            return `
              <div class="product-image-container">
                <img src="${product.image}">
              </div>

              <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div class="product-delivery-date">
                  Arriving on: ${item.estimatedDeliveryTime}
                </div>
                <div class="product-quantity">
                  Quantity: ${item.quantity}</div>
                <button class="buy-again-button button-primary">
                  Buy it again
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
 }
    
