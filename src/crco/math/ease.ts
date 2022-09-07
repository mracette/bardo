/**
 * Adapted from https://github.com/d3/d3-ease
 */

export const quadIn = (t: number) => {
  return t * t;
};

export const quadOut = (t: number) => {
  return t * (2 - t);
};

export const quadInOut = (t: number) => {
  // eslint-disable-next-line no-param-reassign
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
};
