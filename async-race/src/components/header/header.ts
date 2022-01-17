import { Button } from '../button/button';

const header: HTMLElement = document.createElement('header');
const headersButtons = new Button();
const garageButton: HTMLButtonElement = headersButtons.createReadyButtonElement('garage', () =>
  console.log('garage')
);
const winnersButton: HTMLButtonElement = headersButtons.createReadyButtonElement('winners', () =>
  console.log('winners')
);
header.append(garageButton, winnersButton);

export default header;
