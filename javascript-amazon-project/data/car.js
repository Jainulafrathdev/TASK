export class car{
  #brand;
  #model;
  #speed=0;
  isTrunkOpen=false;

  constructor(carItems){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
       }

   displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(
      `${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`
    );
  }
  
 
  go() {
    this.speed += 5;
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }
  }
  
    brake() {
      this.speed -= 5;
  
     
      if (this.speed < 0) {
        this.speed = 0;
      }

  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

}

class RaceCar extends car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  }
}






const car1 = new car({
  brand: 'Toyota',
  model: 'Corolla'
});
const car2 = new car({
  brand: 'Tesla',
  model: 'Model 3'
});


const raceCar = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

console.log(car1);
console.log(car2);
car1.displayInfo();
car2.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();


car1.openTrunk();
car1.displayInfo();


car2.displayInfo();


car2.openTrunk();

car2.go();

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();