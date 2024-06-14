import './carTrack.scss';
import carTrackElementText from './carTrack.html';
import htmlFromString from '../../../utilites/htmlFromString';
import Car from '../../car/car';
import { carColor, engineStartStopPromise } from '../../../utilites/types';
import { Button } from '../../button/button';
import { urlObj } from '../../../utilites/consts';
import { IgoDrivePromise, IonClickFunctionsObj } from '../../../utilites/interfaces';

class Track extends Button {
  private carInstance: Car | undefined;

  private getCarTrackDiv(): DocumentFragment {
    return htmlFromString(carTrackElementText);
  }

  onClickFunctionsObj: IonClickFunctionsObj = {
    select: this.startEngine,
    remove: this.deleteFromGarage,
    start: this.goDrive,
    stop: this.stopEngine,
  };

  buttonsNames = Object.keys(this.onClickFunctionsObj);

  createTrack(color: carColor, name: string) {
    const fragment = this.getCarTrackDiv();
    const buttonsDiv = fragment.querySelector('.track-control__buttons') as HTMLDivElement;
    const nameOfCarSpan = fragment.querySelector('.track-control__span') as HTMLSpanElement;
    const trackDiv = fragment.querySelector('.track') as HTMLDivElement;
    this.carInstance = new Car(color, name);
    const car = this.carInstance.returnCarElement() as DocumentFragment;
    const arrayOfButtons = this.createArrayOfButtonsForTrack();
    nameOfCarSpan.innerText = name;
    arrayOfButtons.forEach((buttonElement) => buttonsDiv.append(buttonElement));
    trackDiv.append(car);
    return fragment;
  }

  private createArrayOfButtonsForTrack(): HTMLButtonElement[] {
    return this.buttonsNames.map((value) => {
      return this.createReadyButtonElement(value);
    });
  }

  async startEngine(id: number): Promise<engineStartStopPromise | undefined> {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      redirect: 'follow',
    };
    const requestValue = `?id=${id}&status=started`;
    try {
      const res = await fetch(`${urlObj.engineUrl}${requestValue}`, requestOptions);
      console.log(await res.json());
      return (await res.json()) as engineStartStopPromise;
    } catch (error) {
      console.log('error', error);
    }
  }

  async stopEngine(id: number): Promise<engineStartStopPromise | undefined> {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      redirect: 'follow',
    };
    const requestValue = `?id=${id}&status=stopped`;
    try {
      const res = await fetch(`${urlObj.engineUrl}${requestValue}`, requestOptions);
      return (await res.json()) as engineStartStopPromise;
    } catch (error) {
      console.log('error', error);
    }
  }

  async goDrive(id: number): Promise<void | IgoDrivePromise> {
    const status = 'drive';
    const requestValue = `?id=${id}&status=${status}`;
    const requestOptions: RequestInit = {
      method: 'PATCH',
      redirect: 'follow',
    };

    return fetch(`${urlObj.engineUrl}${requestValue}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return result as IgoDrivePromise;
      })
      .catch((error) => console.log('error', error));
  }

  async deleteFromGarage(id: number) {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      redirect: 'follow',
    };
    fetch(`${urlObj.garageUrl}/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
}

export default Track;
