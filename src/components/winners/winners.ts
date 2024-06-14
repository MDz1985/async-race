import { urlObj } from '../../utilites/consts';
import { Garage } from '../garage/garage';
import { IgetWinnersPromise } from '../../utilites/interfaces';

type order = 'ASC' | 'DESC';
type sort = 'id' | 'wins' | 'time';

export class Winners extends Garage {
  async addCurrentWinner(idNumber: number, time: number) {
    this.getAllWinners().then((value) => {
      const prevCurrentWinsObj: IgetWinnersPromise | undefined = value.find(({ id }) => id === idNumber);
      let wins: number;
      if (prevCurrentWinsObj) {
        wins = prevCurrentWinsObj.wins + 1;
        this.updateWinner(idNumber, wins, time);
      } else {
        wins = 1;
        this.createWinner(idNumber, wins, time);
      }
    });
  }

  async getAllWinners(): Promise<IgetWinnersPromise[]> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };
    return fetch(`${urlObj.winnersUrl}`, requestOptions).then((response) => {
      if (response.ok) {
        return response.json();
      } else return Promise.reject('error');
    });
  }

  async getWinners(page: number, limitPerPage: number, order: order, sort: sort): Promise<IgetWinnersPromise[]> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };

    const queryParams = `?_page=${page}&_limit=${limitPerPage}&_order=${order}&_sort=${sort}`;

    return fetch(`${urlObj.winnersUrl}${queryParams}`, requestOptions).then((response) => {
      if (response.ok) {
        return response.json();
      } else return Promise.reject('error');
    });
  }

  async getWinnerById(id: number) {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`${urlObj.winnersUrl}/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  async createWinner(id: number, wins: number, time: number) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      id: id,
      wins: wins,
      time: time,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(urlObj.winnersUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  async deleteWinner(id: number) {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`${urlObj.winnersUrl}/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  async updateWinner(id: number, wins: number, time: number) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      wins: wins,
      time: time,
    });

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${urlObj.winnersUrl}/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
}
