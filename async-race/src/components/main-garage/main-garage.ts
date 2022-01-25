import './main-garage.scss';
import htmlFromString from '../../utilites/htmlFromString';
import garageTextFromHtml from './main-garage.html';
import { Button } from '../button/button';
import Track from './carTrack/carTrack';
import { carColor } from '../../utilites/types';
import { ICarFromGarage, IEnginePromise } from '../../utilites/interfaces';
import { carsArray, carsModelsArray, carsPerPageLimit, randomCarsCount } from '../../utilites/consts';
import { Winners } from '../winners/winners';

const fragment: DocumentFragment = htmlFromString(garageTextFromHtml);
const garageMainElement = fragment.querySelector('.main') as HTMLElement;
const carsTracksDiv = garageMainElement.querySelector('.tracks-container') as HTMLDivElement;
const nameInput = garageMainElement.querySelector('.name_input') as HTMLInputElement;
const colorInput = garageMainElement.querySelector('.color_input') as HTMLInputElement;
const nameInputChange = garageMainElement.querySelector('.change-name_input') as HTMLInputElement;
const colorInputChange = garageMainElement.querySelector('.change-color_input') as HTMLInputElement;
const carMenuCreateLiElement = garageMainElement.querySelector('.create-cars-menu') as HTMLLIElement;
const carMenuUpdateLiElement = garageMainElement.querySelector('.update-cars-menu') as HTMLLIElement;
const controlsMenu = garageMainElement.querySelector('.race-menu') as HTMLLIElement;

const garageMainButtons = new Button();
const trackInstance = new Track();

const prevButton = garageMainButtons.createReadyButtonElement('Prev', () => {
  if (race.currentPage > 1) {
    race.currentPage--;
    race.setCurrentPageOfCars();
  }
});
const nextButton = garageMainButtons.createReadyButtonElement('Next', () => {
  if (race.currentPage < race.pagesCount()) {
    race.currentPage++;
    race.setCurrentPageOfCars();
  }
});

let animationID: number;

export class Race extends Winners {
  currentPage = 1;
  selectedCarId = 0;
  private carsCount = 0;
  pagesCount: () => number = () => this.carsCount / carsPerPageLimit;

  private displayPagesNumber() {
    const pagesNumberSpan = garageMainElement.querySelector('.garage__page-number') as HTMLSpanElement;
    pagesNumberSpan.innerText = ` #${this.currentPage}`;
  }

  private displayCarsCount() {
    const carsCountSpan = garageMainElement.querySelector('.garage__cars-count') as HTMLSpanElement;
    this.getAllCars().then((result) => {
      this.carsCount = (<ICarFromGarage[]>result).length;
      carsCountSpan.innerText = ` (${this.carsCount})`;
    });
  }

  setCurrentPageOfCars() {
    this.displayPagesNumber();
    this.displayCarsCount();
    this.getPageOfCars(this.currentPage, carsPerPageLimit).then((result) => {
      carsTracksDiv.innerHTML = '';
      (<ICarFromGarage[]>result).forEach((value) => {
        const track = trackInstance.createTrack(value.color, value.name);
        const buttonsBox = track.querySelector('.track-control__buttons') as HTMLDivElement;
        const buttons = track.querySelectorAll('.button') as NodeListOf<HTMLElement>;
        const car = track.querySelector('.car-svg') as HTMLElement;
        buttons[3].className = 'rottom';
        buttonsBox.addEventListener('click', (event) => this.onClickFunction(event, buttons, car, value.id));
        carsTracksDiv.append(track);
      });
      carsTracksDiv.append(prevButton, nextButton);
    });
  }

  private onClickFunction(event: Event, buttons: NodeListOf<HTMLElement>, car: HTMLElement, id: number) {
    const target = event.target as HTMLButtonElement;
    switch (target) {
      case buttons[0]:
        this.startEngine(id).then((result) => {
          if (typeof result !== 'number') {
            this.getCarById(id).then((result) => {
              this.selectedCarId = id;
              nameInputChange.value = (<ICarFromGarage>result).name;
              colorInputChange.value = (<ICarFromGarage>result).color;
            });
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
              const duration = result.distance / result.velocity;
              (<HTMLElement>target).className = 'roottom';
              animateCarDrive(car, draw, duration);
              return this.goDrive(id);
            }
          })
          .then(
            () => {
              buttons[3].className = 'button';
            },
            () => {
              cancelAnimationFrame(animationID);
              buttons[3].className = 'button';
            }
          );

        break;
      case buttons[3]:
        if (buttons[3].className === 'button') {
          this.stopEngine(id).then((result) => {
            if (<IEnginePromise>result) {
              (<HTMLElement>target).className = 'roottom';
              (<HTMLElement>buttons[2]).className = 'button';
              car.style.left = '';
            }
          });
        }
        break;
    }
  }

  // duarationArray: { id: number; duaration: number }[] = [{ id: 0, duaration: 9999999999 }];

  raceCar(id: number, indexNumber: number) {
    const carsArray = document.querySelectorAll('.car-svg') as NodeListOf<HTMLElement>;
    const car = carsArray[indexNumber] as HTMLElement;
    let duration: number;
    return this.startEngine(id)
      .then((result) => {
        if (typeof result !== 'number') {
          duration = result.distance / result.velocity;
          animateCarDrive(car, draw, duration);
          return this.goDrive(id);
        }
      })
      .then(
        () => {
          return { id: id, duration: duration };
        },
        () => {
          cancelAnimationFrame(animationID);
          return Promise.reject('error');
        }
      );
  }

  resetCarEngineStatus(id: number, indexNumber: number) {
    const carsArray = document.querySelectorAll('.car-svg') as NodeListOf<HTMLElement>;
    const car = carsArray[indexNumber] as HTMLElement;
    cancelAnimationFrame(animationID);
    this.stopEngine(id).then(() => {
      car.style.left = '';
    });
  }

  createSetOfRandomCars() {
    const colorsArray = this.returnArrayOfRandomColors();
    this.returnArrayOfRandomCarNames().forEach((item, index) => {
      this.addToGarage(item, colorsArray[index]).then(() => {
        this.setCurrentPageOfCars();
      });
    });
  }

  returnArrayOfRandomColors() {
    const colorArray: carColor[] = Array(randomCarsCount).fill('#');
    const maxNumber = 1000000;
    const minNumber = 99999;
    const randomColorNumber = () => Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
    return colorArray.map((value) => value + randomColorNumber()) as carColor[];
  }

  returnArrayOfRandomCarNames() {
    const carsNamesArray: string[] = Array(randomCarsCount).fill('');
    const firstPartOfNameArray = this.returnConcatedArray(carsArray);
    const secondPartOfNameArray = this.returnConcatedArray(carsModelsArray);
    return carsNamesArray.map((value, index) => `${firstPartOfNameArray[index]} ${secondPartOfNameArray[index]}`);
  }

  private randomSortArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  private returnConcatedArray(array: string[]) {
    while (array.length < randomCarsCount) {
      array = array.concat(this.randomSortArray(array));
    }
    return array;
  }
}

function animateCarDrive(car: HTMLElement, draw: (progress: number, element: HTMLElement) => void, duration: number) {
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
      animationID = requestAnimationFrame(animate);
    }
  });
}

function draw(progress: number, element: HTMLElement) {
  element.style.left = progress * 80 + 'vw';
}

const race = new Race();
race.setCurrentPageOfCars();

const buttonCreate = garageMainButtons.createReadyButtonElement('create', () => {
  const name = nameInput.value;
  const color = colorInput.value as `#${string}`;
  if (nameInput.value) {
    race.addToGarage(name, color).then(() => {
      // carsTracksDiv.append(carTrack(name, color));
      race.setCurrentPageOfCars();
      nameInput.value = '';
    });
  } else console.log('no name');
});
const buttonUpdate = garageMainButtons.createReadyButtonElement('update', () => {
  const name = nameInputChange.value;
  const black: carColor = '#000000';
  const color = <carColor>colorInputChange.value;
  race.updateCarInfo(race.selectedCarId, name, color).then(() => race.setCurrentPageOfCars());
  colorInputChange.value = black;
  nameInputChange.value = '';
  race.selectedCarId = 0;
  race.setCurrentPageOfCars();
});

const buttonRace = garageMainButtons.createReadyButtonElement('race', () => {
  const superarray: Promise<{ duration: number; id: number }>[] = [];
  let arrayOfCars: ICarFromGarage[];

  race.getPageOfCars(race.currentPage, carsPerPageLimit).then((result) => {
    arrayOfCars = <ICarFromGarage[]>result;
    (<ICarFromGarage[]>result).forEach((value, index) => {
      setTimeout(() => superarray.push(<Promise<{ duration: number; id: number }>>race.raceCar(value.id, index)));
    });
    setTimeout(() =>
      Promise.any(superarray).then((value) => {
        const timeOfWinner = Math.floor(value.duration / 100) / 10;
        const winnerText = `Winner: ${(<ICarFromGarage>arrayOfCars.find((ICar) => ICar.id === value.id)).name} ${timeOfWinner} sec`;
        console.log(winnerText);
        const winnerButton = garageMainButtons.createReadyButtonElement(winnerText, () => {
          garageMainElement.removeChild(winnerButton);
        });
        winnerButton.className = 'winner-button';
        garageMainElement.append(winnerButton);
        race.addCurrentWinner(value.id, timeOfWinner);
      })
    );
  });
});

race.getAllCars();

const buttonReset = garageMainButtons.createReadyButtonElement('reset', () => {
  race.getPageOfCars(race.currentPage, carsPerPageLimit).then((result) => {
    (<ICarFromGarage[]>result).forEach((value, index) => {
      race.resetCarEngineStatus(value.id, index);
    });
  });
});
const buttonGenerate = garageMainButtons.createReadyButtonElement('generate', () => {
  race.createSetOfRandomCars();
});

controlsMenu.append(buttonRace, buttonReset, buttonGenerate);

carMenuCreateLiElement.append(buttonCreate);

carMenuUpdateLiElement.append(buttonUpdate);

export default garageMainElement;
