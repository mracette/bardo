export const isSomeUndefined = (...values: any[]): boolean =>
  values.some((value) => typeof value === 'undefined');
