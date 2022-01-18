import './carTrack.scss';
import carTrackElementText from './carTrack.html';
import htmlFromString from '../../../utilites/htmlFromString';
import Car from '../../car/car';
import { carColor } from '../../../utilites/types';
import { Button } from '../../button/button';

const buttons = new Button();

class Track extends Button {
  private carInstance: Car | undefined;

  private getCarTrackDiv(): DocumentFragment {
    return htmlFromString(carTrackElementText);
  }

  buttonsNames = ['select', 'remove', 'race', 'stop'];

  createTrack(color: carColor, name: string) {
    const fragment = this.getCarTrackDiv();
    const buttonsDiv = fragment.querySelector('.track-control__buttons') as HTMLDivElement;
    const nameOfCarSpan = fragment.querySelector('.track-control__span') as HTMLSpanElement;
    const trackDiv = fragment.querySelector('.track') as HTMLDivElement;
    this.carInstance = new Car(color, name);
    const car = this.carInstance.returnCarElement() as DocumentFragment;
    const arrayOfButtons = this.createArrayOfButtonsForTrack();
    nameOfCarSpan.innerText = name;
    arrayOfButtons.forEach((value) => buttonsDiv.append(value));
    trackDiv.append(car);
    return fragment;
  }

  private createArrayOfButtonsForTrack(): HTMLButtonElement[] {
    return this.buttonsNames.map((value) => {
      return this.createReadyButtonElement(value);
    });
  }
}

export default Track;
