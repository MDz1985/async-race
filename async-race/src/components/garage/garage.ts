import { urlObj } from '../../utilites/consts';
import { ICarFromGarage } from '../../utilites/interfaces';
import { engineStartStopPromise } from '../../utilites/types';

export class Garage {
  carsArray: Promise<ICarFromGarage[]> | undefined;

  async getCarsInGarageArray(): Promise<ICarFromGarage[]> {
    const res = await fetch(urlObj.garageUrl);
    this.carsArray = res.json();
    return this.carsArray as Promise<ICarFromGarage[]>;
  }

  async updCarInf(id: number, newName?: string, newColor?: `#${number}`) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      name: newName,
      color: newColor,
    });

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(`${urlObj.garageUrl}/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
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

  async addToGarage(name: string, color: `#${string}`) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw: string = JSON.stringify({
      name: name,
      color: color,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(urlObj.garageUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  async getCarById(id: number): Promise<ICarFromGarage | void> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };

    return fetch(`${urlObj.garageUrl}/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => console.log('error', error));
  }

  async getPageOfCars(page: number, limitPerPage: number): Promise<ICarFromGarage[] | void> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };
    const queryParams = `?_page=${page}&_limit=${limitPerPage}`;
    return fetch(`${urlObj.garageUrl}${queryParams}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  }

  async getAllCars(): Promise<ICarFromGarage[] | void> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };
    return fetch(`${urlObj.garageUrl}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => console.log('error', error));
  }
}
