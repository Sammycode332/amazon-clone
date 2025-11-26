import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCartQuantity,loadCart } from "../data/cart.js";
import { loadProducts,loadProductsFetch} from "../data/products.js";
//import '../data/car.js';
//import '../data/backend-practice.js';
 //loadProducts(()=>{
       
      //resolve('value1');
      //resolve controls when we want to go the the next step
    //});
    //whatever value you give to result wil be saved in that parameter,
    async function loadPage() {

      await loadProductsFetch()

      await new Promise((resolve)=>{
      loadCart(()=>{
        resolve(); 
      });
    });
    //you can put a resolve value in the await variable nd get it returned later     
     renderOrderSummary();
     renderPaymentSummary();
    }
    // you can use await when we re inside an async function
    loadPage();
    /*
    Promise.all([
   loadProductsFetch(),
   new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      });
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary()
});
*/
/*
new Promise((resolve)=>{
   
    loadProducts(()=>{
       
      resolve('value1');
      //resolve controls when we want to go the the next step
    })
    //whatever value you give to result wil be saved in that parameter
}).then((value)=>{
    console.log(value)
    return new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      });
    });
   }).then(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    }); 
    
    //Promise.all() makes us run multiple promises nd wait for them to finish
*/
/*
loadProducts(()=>{
    loadCart(()=>{
      renderOrderSummary();
       renderPaymentSummary()
   })
;
});
*/

