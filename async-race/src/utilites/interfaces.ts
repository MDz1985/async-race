import { carColor, color, engineStartStopPromise, engineStatus } from './types';

export interface IButton {
  color: color;
  innerText: string;
}

export interface ICar {
  get color(): carColor;

  set color(hexColor: carColor);

  get name(): string;

  set name(carName: string);

  startStopEngine(id: number, status: engineStatus): PromiseLike<engineStartStopPromise>;
}

export interface ICarFromGarage {
  name: string;
  color: `#${string}`;
  id: 1;
}
