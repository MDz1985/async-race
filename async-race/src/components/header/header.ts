import { Button } from '../button/button';
import mainGarage from '../main-garage/main-garage';
import mainWinners, { MainWinners } from '../main-winners/main-winners';

const header: HTMLElement = document.createElement('header');
const headersButtons = new Button();
const garageButton: HTMLButtonElement = headersButtons.createReadyButtonElement('garage', () => {
  if (document.querySelector('.winners')) {
    mainWinners.replaceWith(mainGarage);
  }
});
const mainWinnersInstanse = new MainWinners();

const winnersButton: HTMLButtonElement = headersButtons.createReadyButtonElement('winners', () => {
  if (document.querySelector('.garage')) {
    mainGarage.replaceWith(mainWinners);
    mainWinnersInstanse.createTableOfWinners();
  }
});

header.append(garageButton, winnersButton);

export default header;
