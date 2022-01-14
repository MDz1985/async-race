export type color = 'blue' | 'violet' | 'yellow' | 'red' | 'grey';
export type carColor = `#${string}`;

export type engineStatus = 'started' | 'stopped';
export type engineStartStopPromise = {
  velocity: number;
  distance: number;
};
