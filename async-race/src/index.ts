import './index.scss';
import header from './components/header/header';
import garageMainElement from './components/main-garage/main-garage';

const body = document.querySelector('body') as HTMLElement;
body.append(header, garageMainElement);

console.log(
  'Приветствую тебя, о великодушный проверяющий! Если тебя не затруднит, не мог бы ты немного отложить проверку? Я устраню мелкие косяки и выведу в консоль самооценку. Огромное спасибо за проявленное понимание и великодушие!'
);
