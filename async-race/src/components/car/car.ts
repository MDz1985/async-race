import './car.scss';
import { carColor, engineStartStopPromise, engineStatus } from '../../utilites/types';
import { ICar } from '../../utilites/interfaces';
import { urlObj } from '../../utilites/consts';
import carSvgElementText from './carSVG.html';
import strToHtml from '../../utilites/htmlFromString';

const carElement = strToHtml(carSvgElementText);
const carFrame = carElement.querySelector('.car-frame') as SVGPathElement;
const carColor: `#${string}` = '#345678';
carFrame.style.fill = carColor;

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

  returnCarElement() {
    const carElement = strToHtml(carSvgElementText);
    const carFrame = carElement.querySelector('.car-frame') as SVGPathElement;
    carFrame.style.fill = this.color;
    return carElement;
  }

  async startStopEngine(id: number, status: engineStatus) {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      redirect: 'follow',
    };
    const requestValue = `?id=${id}&status=${status}`;
    try {
      const res = await fetch(`${urlObj.engineUrl}${requestValue}`, requestOptions);
      return (await res.json()) as engineStartStopPromise;
    } catch (error) {
      console.log('error', error);
    }
  }

  async goDrive(id: number) {
    const status = 'drive';
    const requestValue = `?id=${id}&status=${status}`;
    const requestOptions: RequestInit = {
      method: 'PATCH',
      redirect: 'follow',
    };

    fetch(`${urlObj.engineUrl}${requestValue}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  private _color: carColor;
  private _name: string;
}
