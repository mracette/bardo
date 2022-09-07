export const isUndefined = <T>(value: T | undefined): value is undefined =>
  typeof value === 'undefined';
