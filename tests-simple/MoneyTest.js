import { formatCurrency } from '../scripts/utils/money.js'
console.log('test suite: formatCurrency')
if(formatCurrency(2095) === '20.95'){
    console.log('passed')
}else{
    console.log('Failed')
}
if(formatCurrency(0) === '0.00'){
    console.log('passed')
}else{
    console.log('Failed')
}
if(formatCurrency(2000.5) === '20.01'){
    console.log('passed')
}else{
    console.log('Failed')
}
if(formatCurrency(2000.4) === '20.00'){
    console.log('passed')
}else{
    console.log('Failed')
}
//basic case is just to check if the code is working

//edge case is to test with tricky values