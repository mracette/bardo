export enum SequenceAlignment {
  SpaceBetween = 'space-between',
  SpaceAround = 'space-around'
}

export interface SequenceOptions {
  alignment: SequenceAlignment;
  bounds: [number, number];
  count: number;
  distribution: (n: number) => number;
}

export const range = (start: number, end: number, step: number) => {
  const array = [];
  let n = start;
  while (step > 0 ? n <= end : n >= end) {
    array.push(n);
    n += step;
  }
  return array;
};
