import './main-garage.scss';
import htmlFromString from '../../utilites/htmlFromString';
import garageTextFromHtml from './main-garage.html';
import { Button } from '../button/button';
import Track from './carTrack/carTrack';
import { Garage } from '../garage/garage';
import { carColor } from '../../utilites/types';
import { IEnginePromise, ICarFromGarage } from '../../utilites/interfaces';
import { limitPerPage } from '../../utilites/consts';
import { target } from 'nouislider';

const fragment: DocumentFragment = htmlFromString(garageTextFromHtml);
const garageMainElement = fragment.querySelector('.main') as HTMLElement;
const carsTracksDiv = garageMainElement.querySelector('.tracks-container') as HTMLDivElement;
const nameInput = garageMainElement.querySelector('.name_input') as HTMLInputElement;
const colorInput = garageMainElement.querySelector('.color_input') as HTMLInputElement;
const carMenuCreateLiElement = garageMainElement.querySelector(
  '.create-cars-menu'
) as HTMLLIElement;
const carMenuUpdateLiElement = garageMainElement.querySelector(
  '.update-cars-menu'
) as HTMLLIElement;
const controlsMenu = garageMainElement.querySelector('.race-menu') as HTMLLIElement;

const garageMainButtons = new Button();
// const garageRequests = new Garage();
const trackInstance = new Track();

const carTrack = (name: string, color: carColor) => {
  return trackInstance.createTrack(color, name) as Node;
};

let animationID: number;
class Race extends Garage {
  currentPage = 1;

  private displayPagesNumber() {
    const pagesNumberSpan = garageMainElement.querySelector(
      '.garage__page-number'
    ) as HTMLSpanElement;
    pagesNumberSpan.innerText = ` #${this.currentPage}`;
  }

  private displayCarsCount() {
    const carsCountSpan = garageMainElement.querySelector('.garage__cars-count') as HTMLSpanElement;
    this.getAllCars().then((result) => {
      const carsCount = (<ICarFromGarage[]>result).length;
      carsCountSpan.innerText = ` (${carsCount})`;
    });
  }

  setCurrentPageOfCars() {
    this.getPageOfCars(this.currentPage, limitPerPage).then((result) => {
      console.log(<ICarFromGarage[]>result);
      this.displayPagesNumber();
      this.displayCarsCount();
      carsTracksDiv.innerHTML = '';
      (<ICarFromGarage[]>result).forEach((value) => {
        const track = trackInstance.createTrack(value.color, value.name);
        const buttonsBox = track.querySelector('.track-control__buttons') as HTMLDivElement;
        const buttons = track.querySelectorAll('.button') as NodeListOf<HTMLElement>;
        const car = track.querySelector('.car-svg') as HTMLElement;
        buttons[3].className = 'rottom';
        buttonsBox.addEventListener('click', (event) =>
          this.onClickFunction(event, buttons, car, value.id)
        );
        carsTracksDiv.append(track);
      });
    });
  }

  // isEngineWork = { id: 0, result: false, time: 0 };

  time = [{ id: 0, time: 0 }];

  private onClickFunction(
    event: Event,
    buttons: NodeListOf<HTMLElement>,
    car: HTMLElement,
    id: number
  ) {
    const target = event.target as HTMLButtonElement;
    switch (target) {
      case buttons[0]:
        this.startEngine(id).then((result) => {
          if (typeof result !== 'number') {
            console.log('select', id);
            const duration = result.distance / result.velocity;
            this.time.push({ id: id, time: duration });
            buttons[3].className = 'button';
          }
        });
        break;
      case buttons[1]:
        this.deleteFromGarage(id);
        this.setCurrentPageOfCars();
        break;
      case buttons[2]:
        this.startEngine(id)
          .then((result) => {
            if (typeof result !== 'number') {
              console.log('select', id, result);
              const duration = result.distance / result.velocity;
              (<HTMLElement>target).className = 'roottom';
              animateCarDrive(car, draw, duration);
              return this.goDrive(id);
            }
          })
          .then((promise) => {
            if (promise === 500) {
              console.log('stop', car.style.left, animationID);
              // const b: string = car.style.left;
              cancelAnimationFrame(animationID);
              // car.style.left = b;
            }
            buttons[3].className = 'button';
            console.log(promise);
          });

        break;
      case buttons[3]:
        console.log(4);
        this.stopEngine(id);
        (<HTMLElement>target).className = 'roottom';
        (<HTMLElement>buttons[2]).className = 'button';
        car.style.left = '';
        break;
    }
  }
}

function animateCarDrive(
  car: HTMLElement,
  draw: (progress: number, element: HTMLElement) => void,
  duration: number
) {
  const start = performance.now();

  function linear(timeFraction: number) {
    return timeFraction;
  }

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    const progress = linear(timeFraction);
    draw(progress, car);
    if (timeFraction < 1) {
      // requestAnimationFrame(animate);
      animationID = requestAnimationFrame(animate);
    }
  });
}

function draw(progress: number, element: HTMLElement) {
  element.style.left = progress * 80 + 'vw';
}
// function df(progress: number, element: HTMLElement) {
//   const b = element.style.left;
//   element.style.left = b;
// }

const race = new Race();
race.setCurrentPageOfCars();

const buttonCreate = garageMainButtons.createReadyButtonElement('create', () => {
  const name = nameInput.value;
  const color = colorInput.value as `#${string}`;
  if (nameInput.value) {
    race.addToGarage(name, color).then(() => {
      carsTracksDiv.append(carTrack(name, color));
      race.setCurrentPageOfCars();
      nameInput.value = '';
    });
  } else console.log('no name');
});
const buttonUpdate = garageMainButtons.createReadyButtonElement('update', () => {
  console.log('update');
  race.getAllCars().then((result) => {
    race
      .deleteFromGarage((<ICarFromGarage[]>result).length)
      .then(() => race.setCurrentPageOfCars());
  });
});

const buttonRace = garageMainButtons.createReadyButtonElement('race', () => console.log('race'));
const buttonReset = garageMainButtons.createReadyButtonElement('reset', () => console.log('reset'));
const buttonGenerate = garageMainButtons.createReadyButtonElement('generate', () =>
  console.log('generate')
);

controlsMenu.append(buttonRace, buttonReset, buttonGenerate);

carMenuCreateLiElement.append(buttonCreate);

carMenuUpdateLiElement.append(buttonUpdate);

// for (let i = 0; i < 100; i++) {
//   garageMainElement.append(carTrack());
// }

export default garageMainElement;
