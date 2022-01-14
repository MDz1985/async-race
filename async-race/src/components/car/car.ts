import { carColor, engineStartStopPromise, engineStatus } from '../../utilites/types';
import { ICar } from '../../utilites/interfaces';
import { json } from 'stream/consumers';
import { urlObj } from '../../utilites/consts';

const defaultColor = '#fffff';

export default class Car implements ICar {
  constructor(carColor: carColor, carName: string) {
    this._color = carColor;
    this._name = carName;
  }

  get color() {
    return this._color || defaultColor;
  }

  set color(hexColor) {
    this._color = hexColor;
  }

  get name() {
    return this._name || '';
  }

  set name(nameOfCar) {
    this._name = nameOfCar;
  }

  async startStopEngine(id: number, status: engineStatus) {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      redirect: 'follow',
    };
    const requestValue = `?id=${id}&status=${status}`;
    const res = await fetch(`${urlObj.engineUrl}${requestValue}`, requestOptions);
    const runParametersObj = (await res.json()) as engineStartStopPromise;
    return runParametersObj;
  }

  private _color: carColor;
  private _name: string;
}
