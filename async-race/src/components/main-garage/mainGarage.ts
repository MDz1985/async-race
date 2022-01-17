import htmlFromString from '../../utilites/htmlFromString';
import garageTextFromHtml from './garage.html';
import { Button } from '../button/button';
import Track from './carTrack/carTrack';

const garageMainButtons = new Button();
const buttonCreate = garageMainButtons.createReadyButtonElement('create', () =>
  console.log('create')
);
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
const carMenuCreateLiElement = garageMainElement.querySelector(
  '.create-cars-menu'
) as HTMLLIElement;
const carMenuUpdateLiElement = garageMainElement.querySelector(
  '.update-cars-menu'
) as HTMLLIElement;
const controlsMenu = garageMainElement.querySelector('.race-menu') as HTMLLIElement;
controlsMenu.append(buttonRace, buttonReset, buttonGenerate);
// connst buttonsInnerText = ['race', 'reset', ]
// const controlsMenuButtons = Array(3);
// controlsMenuButtons.map((value, index) => )
carMenuCreateLiElement.append(buttonCreate);
carMenuUpdateLiElement.append(buttonUpdate);

const trackInstanse = new Track();
const carTrack = () => {
  return trackInstanse.createTrack('#234545', 'alfa') as Node;
};
for (let i = 0; i < 100; i++) {
  garageMainElement.append(carTrack());
}
garageMainElement.append(carTrack());

export default garageMainElement;
