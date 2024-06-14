import './main-winners.scss';
import mainWinnersElementText from './main-winners.html';
import htmlFromString from '../../utilites/htmlFromString';
import { Race } from '../main-garage/main-garage';
import Car from '../car/car';
import { winnersPerPageLimit } from '../../utilites/consts';
import { ICarFromGarage, IgetWinnersPromise } from '../../utilites/interfaces';
import { Button } from '../button/button';
import { sort } from '../../utilites/types';

const arrowUp = '↑';
const arrowDown = '↓';
const fragment: DocumentFragment = htmlFromString(mainWinnersElementText);
const mainWinners = fragment.querySelector('.winners') as HTMLElement;
const winnersTable = mainWinners.querySelector('.table') as HTMLTableElement;
const winnersTablesBody = mainWinners.querySelector('.table__body') as HTMLElement;
const tableTitlesShell = mainWinners.querySelector('.table__head') as HTMLElement;
const tableSortedTitles = tableTitlesShell.querySelectorAll('.table-sorted-title') as NodeListOf<HTMLTableCellElement>;
const numberTitle = winnersTable.querySelector('.number_title') as HTMLTitleElement;
const winsTitle = winnersTable.querySelector('.wins_title') as HTMLTitleElement;
const timeTitle = winnersTable.querySelector('.time_title') as HTMLTitleElement;
const winnersMainButtons = new Button();

const prevButton = winnersMainButtons.createReadyButtonElement('Prev', () => {
  if (winInstance.currentPage > 1) {
    winInstance.currentPage--;
    winInstance.createTableOfWinners();
  }
});
const nextButton = winnersMainButtons.createReadyButtonElement('Next', () => {
  if (winInstance.currentPage < winInstance.pagesCount()) {
    winInstance.currentPage++;
    winInstance.createTableOfWinners();
  }
});

export class Win extends Race {
  currentPage = 1;
  sort: sort = 'id';
  order: 'ASC' | 'DESC' = 'ASC';
  private winnersCount = 0;
  pagesCount: () => number = () => this.winnersCount / winnersPerPageLimit;

  private addArrowToTableSortTitle() {
    let arrow: string;
    let title: 'Number' | 'Wins' | 'Best time(seconds)';
    let titleElement: HTMLElement;
    if (this.order === 'ASC') {
      arrow = arrowDown;
    } else arrow = arrowUp;
    switch (this.sort) {
      case 'id':
        title = 'Number';
        titleElement = numberTitle;
        break;
      case 'wins':
        title = 'Wins';
        titleElement = winsTitle;
        break;
      case 'time':
        title = 'Best time(seconds)';
        titleElement = timeTitle;
        break;
    }
    tableSortedTitles.forEach(
      (titleElement) => (titleElement.innerText = titleElement.innerText.replace(` ${arrowUp}`, '').replace(` ${arrowDown}`, ''))
    );
    titleElement.innerText = `${title} ${arrow}`;
  }

  private displayWinnersPagesNumber() {
    const pagesNumberSpan = mainWinners.querySelector('.winners__page-number') as HTMLSpanElement;
    pagesNumberSpan.innerText = ` #${this.currentPage}`;
  }

  private displayWinnersCount() {
    const winnersCountSpan = mainWinners.querySelector('.winners__count') as HTMLSpanElement;
    this.getAllWinners().then((result) => {
      this.winnersCount = (<IgetWinnersPromise[]>result).length;
      winnersCountSpan.innerText = ` (${this.winnersCount})`;
    });
  }

  private createTableLine() {
    const tableLine = document.createElement('tr');
    tableLine.className = 'table-line';
    return tableLine;
  }

  private createTableCell(innerText: string, svgElement?: DocumentFragment) {
    const lineCell = document.createElement('th');
    lineCell.className = 'table-line__cell';
    if (innerText) {
      lineCell.innerText = innerText;
    }
    if (svgElement) {
      lineCell.append(svgElement);
    }
    return lineCell;
  }

  getReadyTableLine(number: number, car: DocumentFragment, wins: number, bestTime: number) {
    const line = this.createTableLine();
    const numberCell = this.createTableCell(String(number));
    const carCell = this.createTableCell('', car);
    const winsCell = this.createTableCell(String(wins));
    const timeCell = this.createTableCell(String(bestTime));
    line.append(numberCell, carCell, winsCell, timeCell);
    return line;
  }

  createTableOfWinners() {
    this.displayWinnersCount();
    this.displayWinnersPagesNumber();
    winnersTablesBody.innerHTML = '';
    this.getWinners(this.currentPage, winnersPerPageLimit, this.order, this.sort).then((winnersArray) => {
      winnersArray.forEach((element) => {
        this.getCarById(element.id).then((car) => {
          const carInstance = new Car((<ICarFromGarage>car).color, (<ICarFromGarage>car).name);
          const carForWin = carInstance.returnCarElement();
          const readyLine = this.getReadyTableLine((<ICarFromGarage>car).id, carForWin, element.wins, element.time);
          winnersTablesBody.append(readyLine);
        });
      });
      winnersTable.after(prevButton, nextButton);
      this.addArrowToTableSortTitle();
    });
  }

  onTitlesClick(event: Event) {
    const target = event.target;
    let sort: sort;
    switch (target) {
      case winsTitle:
        sort = 'wins';
        break;
      case timeTitle:
        sort = 'time';
        break;
      default:
        sort = 'id';
        break;
    }
    if (this.order === 'ASC' && this.sort === sort) {
      this.order = 'DESC';
    } else {
      this.order = 'ASC';
      this.sort = sort;
    }
    this.createTableOfWinners();
  }
}

const winInstance = new Win();

tableTitlesShell.addEventListener('click', (event) => winInstance.onTitlesClick(event));

export default mainWinners;
