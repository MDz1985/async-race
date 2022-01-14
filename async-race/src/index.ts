import Car from './components/car/car';
import { Garage } from './components/garage/garage';

// Car.name = 'alfa';
const cat = new Car('#889900', 'Tesla');
console.log(cat);
cat.color = '#888';
console.log(cat.color, cat.name);
console.log(cat.startStopEngine(1, 'stopped'));

const garage = new Garage();
garage.getCarsInGarageArray().then((r) => console.log(r));
// Promise.resolve(garage.carsArray).then((value) => console.log(value));
