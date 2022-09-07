export const lerp = (t: number, n0: number, n1: number): number =>
  n0 * (1 - t) + n1 * t;
