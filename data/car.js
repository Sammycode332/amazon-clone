class Car { 
    brand;
    model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.brand = carDetails.brand;
        this.model = carDetails.model;
    }
    openTrunk() {
         if(this.speed >0){
          console.log("Can't open trunk while the car is moving!");
            return;  
        }
        this.isTrunkOpen = true
    }
    closeTrunk(){
        this.isTrunkOpen = false;

    }
    go() {
        if (this.isTrunkOpen) {
            console.log("Can't drive with the trunk open!");
            return;
        } 
        this.speed = Math.min(this.speed + 5, 200);
    }

    brake() {
        this.speed = Math.max(this.speed - 5, 0);
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h Trunk open: ${this.isTrunkOpen}`);
    }  
   
}

export const carProducts = [
    {
        brand: 'Toyota',
        model: 'Corolla'
    },
    {
        brand: 'Tesla',
        model: 'Model 3'
    },
].map(carDetails => new Car(carDetails));

carProducts.forEach(car => {
    car.go();
    car.go();
    car.go();
    car.brake();
    car.displayInfo();
});

class RaceCar extends Car {
    acceleration;
    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }
    go(){
        this.speed = Math.min(this.speed + this.acceleration, 300);
    }
    openTrunk(){
        console.log("Race cars don't have trunks!")
    }
    closeTrunk(){
        console.log("Race cars don't have trunks!")
    }
}const f1 = new RaceCar({
    brand: "McLaren",
    model: "F1",
    acceleration: 20
});

f1.go();
f1.go();
f1.displayInfo();