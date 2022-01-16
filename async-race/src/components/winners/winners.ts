import { urlObj } from '../../utilites/consts';

type order = 'ASC' | 'DESC';
type sort = 'id' | 'wins' | 'time';

export class Winners {
  async getWinners(page: number, limitPerPage: number, order: order, sort: sort) {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };

    const queryParams = `?_page=${page}&_limit=${limitPerPage}&_order=${order}`;

    fetch(`${urlObj.winnersUrl}${queryParams}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
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

  async updateWinner(id: number) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      wins: 5,
      time: 1,
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
