class Car{
    brand;
    model;

    constructor(carDetails){
        this.brand = carDetails.brand
        this.model = carDetails.model
    }
    displayInfo(){
        console.log(`${this.brand},${this.model}`)
    }
}
export const carProducts = [
    {
    brand:'Toyota',
    model:'corolla'
},
    {
    brand:'Tesla',
    model:'Model 3'
},
].map((carDetails)=>{
    return new Car(carDetails)
    
})
//console.log(carProducts)
Car.displayInfo()