import './index.scss';
import Car from './components/car/car';
import { Garage } from './components/garage/garage';
// import carSvg from './components/carSVG.html';
// import strToHtml from './utilites/htmlFromString';
import header from './components/header/header';
import garageMainElement from './components/main-garage/mainGarage';

// console.log(carSvg);
const body = document.querySelector('body') as HTMLElement;
body.append(header, garageMainElement);
//
// body.insertAdjacentHTML('afterbegin', carSvg);
// const carElement = strToHtml(carSvg);
// const carFrame = carElement.querySelector('.car-frame') as SVGPathElement;
// const color: `#${string}` = '#345678';
// carFrame.style.fill = color;
// console.log(a);
// body.append(carElement);

// const cat = new Car('#889900', 'Tesla');
// console.log(cat);
// cat.color = '#888';
// console.log(cat.color, cat.name);
// console.log(cat.startStopEngine(1, 'stopped'));

const garage = new Garage();
// garage.getCarsInGarageArray().then((r) => console.log(r));
//
// garage.deleteFromGarage(8);
// garage.addToGarage('alfaRomeo', '#56780');
// garage.getPageOfCars(2, 2);
// garage.updCarInf(5, 'Golf', '#444444');
// cat.startStopEngine(1, 'started').then(() => cat.goDrive(1));
