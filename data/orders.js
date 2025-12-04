export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order)
    //unshift adds to the beginning of the array
    saveToOrdersStorage();
    return order;
}


function saveToOrdersStorage(){
    localStorage.setItem('orders',JSON.stringify(orders))
}