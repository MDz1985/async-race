import './carTrack.scss';
import carTrackElementText from './carTrack.html';
import htmlFromString from '../../../utilites/htmlFromString';
import Car from '../../car/car';
import { carColor } from '../../../utilites/types';

const carTrackDiv = htmlFromString(carTrackElementText) as DocumentFragment;

class Track {
  // trackDiv() {return htmlFromString(carTrackElementText).querySelector('.track') as HTMLDivElement};
  private carInstance: Car | undefined;
  private trackDiv: HTMLDivElement | undefined;

  createTrack(color: carColor, name: string) {
    this.trackDiv = htmlFromString(carTrackElementText).querySelector('.track') as HTMLDivElement;
    this.carInstance = new Car(color, name);
    const car = this.carInstance.returnCarElement() as DocumentFragment;
    this.trackDiv.append(car);
    return this.trackDiv;
  }
}

export default Track;
