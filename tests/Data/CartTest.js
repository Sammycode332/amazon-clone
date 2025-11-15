import {addToCart} from '../../scripts/data/cart.js'
describe('test suite: addToCart',()=>{
    it('adds an existing product to the cart',()=> {

    });
}); 
    it('adds a new product to the cart',()=> {
        //creating a mockup
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([])
        })
        addToCart('') 
        expect(cart.length).toEqual(1);
    });
