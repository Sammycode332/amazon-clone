import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders, loadOrders } from "../../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from '../data/products.js';

// Load products and orders simultaneously, then render
Promise.all([
  loadProductsFetch(), // fetch products
  loadOrders()         // fetch orders
]).then(() => {
  renderOrders();      // render orders after both are loaded
});

async function renderOrders() {
  const container = document.querySelector('.js-orders-grid');
  container.innerHTML = ''; // clear previous content

  // Remove duplicate orders by ID
  const uniqueOrders = orders.filter(
    (order, index, self) =>
      index === self.findIndex(o => o.id === order.id)
  );

  let ordersHTML = '';

  uniqueOrders.forEach(order => {
    const orderDate = dayjs(order.orderTime).format("MMMM D");

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>

            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
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
            if (!product) return ''; // skip if product not found

            return `
              <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
              </div>

              <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div class="product-delivery-date">
                  Arriving on: ${item.estimatedDeliveryTime}
                </div>
                <div class="product-quantity">
                  Quantity: ${item.quantity}
                </div>
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
          }).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = ordersHTML;
}
