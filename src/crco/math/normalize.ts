import { clamp as clampFunction } from './clamp';

export const normalize = (n: number, min: number, max: number, clamp = false): number =>
  ((clamp ? clampFunction(n, min, max) : n) - min) / (max - min);
