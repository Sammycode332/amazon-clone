export function formatCurrency(priceCents){
  return (Math.round(priceCents)/100).toFixed(2)
}  
export default formatCurrency;
//only used to export one thing from a file

