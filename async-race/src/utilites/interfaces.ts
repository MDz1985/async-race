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

  // startStopEngine(
  //   id: number,
  //   status: engineStatus
  // ): PromiseLike<engineStartStopPromise | undefined>;
}

export interface ICarFromGarage {
  name: string;
  color: `#${string}`;
  id: number;
}

export interface IonClickFunctionsObj {
  select: (id: number) => Promise<engineStartStopPromise | undefined>;
  remove: (id: number) => Promise<void>;
  race: (id: number) => Promise<void | IgoDrivePromise>;
  stop: (id: number) => Promise<engineStartStopPromise | undefined>;
}

export interface IEnginePromise {
  velocity: number;
  distance: number;
}

export interface IgoDrivePromise {
  success: true;
}
