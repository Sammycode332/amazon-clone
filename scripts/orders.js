import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { addOrder } from "../../data/orders.js";
import { formatCurrency} from "../utils/money.js";
import { renderPaymentSummary,totalCents } from './checkout/paymentSummary.js';
 
console.log(totalCents)
function renderOrders(){
   const today = dayjs();
   const orderedDate = today.format('MMMM D')
    let ordersHtml = `
    <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div></div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="images/products/intermediate-composite-basketball.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Intermediate Size Basketball
              </div>
              <div class="product-delivery-date">
                Arriving on: June 17
              </div>
              <div class="product-quantity">
                Quantity: 2
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId =123&productId=456">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
    `;
}