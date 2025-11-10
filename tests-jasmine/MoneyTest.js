import { formatCurrency } from '../scripts/utils/money.js'

// describe create a test suite

describe('test suite: formatCurrency',()=>{
    // it create a test case
    it('converts cents to dollars correctly',()=>{
        //expect lets us compare a value we get from the code with the value we expect
        expect(formatCurrency(2095)).toEqual('20.95')
    })
})