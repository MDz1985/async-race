import { urlObj } from '../../utilites/consts';
import { IEnginePromise, ICarFromGarage } from '../../utilites/interfaces';
import { carColor } from '../../utilites/types';

export class Garage {
  async updateCarInfo(id: number, newName?: string, newColor?: carColor) {
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
      // .then((result) => console.log(result))
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

  async getAllCars(): Promise<ICarFromGarage[]> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };
    return fetch(`${urlObj.garageUrl}`, requestOptions).then((response) => {
      if (response.ok) {
        return response.json();
      } else return Promise.reject('error');
    });
  }

  async startEngine(id: number): Promise<IEnginePromise | number> {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      redirect: 'follow',
    };
    const requestValue = `?id=${id}&status=started`;
    return fetch(`${urlObj.engineUrl}${requestValue}`, requestOptions).then((response) => {
      if (response.ok) {
        return response.json();
      } else return response.status;
    });
  }

  async stopEngine(id: number): Promise<IEnginePromise | number> {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      redirect: 'follow',
    };
    const requestValue = `?id=${id}&status=stopped`;
    return fetch(`${urlObj.engineUrl}${requestValue}`, requestOptions).then((response) => {
      if (response.ok) {
        return response.json();
      } else return response.status;
    });
  }

  async goDrive(id: number): Promise<Response> {
    const status = 'drive';
    const requestValue = `?id=${id}&status=${status}`;
    const requestOptions: RequestInit = {
      method: 'PATCH',
      redirect: 'follow',
    };

    return fetch(`${urlObj.engineUrl}${requestValue}`, requestOptions).then((response) => {
      if (response.ok) {
        return response;
      } else return Promise.reject('error');
    });
  }
}
