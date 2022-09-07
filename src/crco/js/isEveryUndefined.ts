export const isEveryUndefined = (...values: any[]) =>
  values.every((value) => typeof value === 'undefined');
