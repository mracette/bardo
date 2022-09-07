export const clamp = (n: number, min: number, max: number): number =>
  Math.max(Math.min(max, n), min);
