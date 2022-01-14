import { urlObj } from '../../utilites/consts';
import { ICarFromGarage } from '../../utilites/interfaces';

export class Garage {
  carsArray: Promise<ICarFromGarage[]> | undefined;
  async getCarsInGarageArray() {
    const res = await fetch(urlObj.garageUrl);
    this.carsArray = res.json();
    return this.carsArray as Promise<ICarFromGarage[]>;
  }
}
