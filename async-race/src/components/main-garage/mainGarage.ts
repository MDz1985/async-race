import htmlFromString from '../../utilites/htmlFromString';
import garageTextFromHtml from './garage.html';
import { Button } from '../button/button';
import Track from './carTrack/carTrack';
import { Garage } from '../garage/garage';
import { carColor } from '../../utilites/types';
import { ICarFromGarage } from '../../utilites/interfaces';
import { limitPerPage } from '../../utilites/consts';

const garageMainButtons = new Button();
const garageRequests = new Garage();
const trackInstance = new Track();

const carTrack = (name: string, color: carColor) => {
  return trackInstance.createTrack(color, name) as Node;
};

//test
class Race {
  currentPage = 1;

  setCurrentPageOfCars() {
    garageRequests.getPageOfCars(this.currentPage, limitPerPage).then((result) => {
      console.log(<ICarFromGarage[]>result);
      (<ICarFromGarage[]>result).forEach((value) => {
        const track = trackInstance.createTrack(value.color, value.name);
        garageMainElement.append(track);
      });
    });
  }
}

const race = new Race();
race.setCurrentPageOfCars();

const buttonCreate = garageMainButtons.createReadyButtonElement('create', () => {
  console.log('create');
  console.log(nameInput.value);
  const name = nameInput.value;
  const color = '#567845';
  if (nameInput.value) {
    garageRequests
      .addToGarage(name, color)
      .then(() => garageMainElement.append(carTrack(name, color)));
  } else console.log('no name');
});
const buttonUpdate = garageMainButtons.createReadyButtonElement('update', () =>
  console.log('update')
);
const buttonRace = garageMainButtons.createReadyButtonElement('race', () => console.log('race'));
const buttonReset = garageMainButtons.createReadyButtonElement('reset', () => console.log('reset'));
const buttonGenerate = garageMainButtons.createReadyButtonElement('generate', () =>
  console.log('generate')
);

const fragment: DocumentFragment = htmlFromString(garageTextFromHtml);
const garageMainElement = fragment.querySelector('.main') as HTMLElement;
const nameInput = garageMainElement.querySelector('.name_input') as HTMLInputElement;
const carMenuCreateLiElement = garageMainElement.querySelector(
  '.create-cars-menu'
) as HTMLLIElement;
const carMenuUpdateLiElement = garageMainElement.querySelector(
  '.update-cars-menu'
) as HTMLLIElement;
const controlsMenu = garageMainElement.querySelector('.race-menu') as HTMLLIElement;

controlsMenu.append(buttonRace, buttonReset, buttonGenerate);
carMenuCreateLiElement.append(buttonCreate);
carMenuUpdateLiElement.append(buttonUpdate);

// for (let i = 0; i < 100; i++) {
//   garageMainElement.append(carTrack());
// }

export default garageMainElement;
