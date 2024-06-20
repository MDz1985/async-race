export const apiUrl = process.env.MODE === 'production' ?  process.env.API_URL : 'http://127.0.0.1:3000';

export const urlObj = {
  garageUrl: `${apiUrl}/garage`,
  engineUrl: `${apiUrl}/engine`,
  winnersUrl: `${apiUrl}/winners`,
};

export const carsPerPageLimit = 7;
export const winnersPerPageLimit = 10;
export const randomCarsCount = 100;

export const carsArray = [
  'AlfaRomeo',
  'AstonMartin',
  'Audi',
  'Dodge',
  'Ferrari',
  'Ford',
  'Honda',
  'Lamborghini',
  'Maserati',
  'Mazda',
  'Mercedes',
  'Nissan',
  'Opel',
  'Rover',
  'Tesla',
  'Toyota',
  'Volkswagen',
];

export const carsModelsArray = [
  'Giulia',
  'Mito',
  'Giulietta',
  '147',
  '159',
  '626',
  'Xedos',
  'Cadet',
  'Astra',
  'Vectra',
  'Fusion',
  'Caravan',
  'Focus',
  'Fiesta',
  'Mondeo',
  'TT',
  'A6',
  'A8',
  'Sunny',
  'Impreza',
];
