import './main-winners.scss';
import mainWinnersElementText from './main-winners.html';
import htmlFromString from '../../utilites/htmlFromString';

export const mainWinners = htmlFromString(mainWinnersElementText).querySelector(
  '.winners'
) as HTMLElement;
