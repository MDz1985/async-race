import './index.scss';
import { Garage } from './components/garage/garage';
import header from './components/header/header';
import garageMainElement from './components/main-garage/main-garage';

const body = document.querySelector('body') as HTMLElement;
body.append(header, garageMainElement);
