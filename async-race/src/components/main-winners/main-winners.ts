import './main-winners.scss';
import mainWinnersElementText from './main-winners.html';
import htmlFromString from '../../utilites/htmlFromString';
import { Race } from '../main-garage/main-garage';
import Car from '../car/car';
import { winnersPerPageLimit } from '../../utilites/consts';
import { ICarFromGarage } from '../../utilites/interfaces';

const fragment: DocumentFragment = htmlFromString(mainWinnersElementText);
const mainWinners = fragment.querySelector('.winners') as HTMLElement;
const winnersTablesBody = mainWinners.querySelector('.table__body') as HTMLElement;

export class MainWinners extends Race {
  currentPage = 1;
  sort: 'id' | 'wins' | 'time' = 'id';
  order: 'ASC' | 'DESC' = 'ASC';

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
    });
  }
}

export default mainWinners;
