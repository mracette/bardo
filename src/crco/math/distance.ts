export const distance = (x0: number, y0: number, x1: number, y1: number) =>
  distanceSquared(x0, y0, x1, y1) ** 0.5;

export const distanceSquared = (x0: number, y0: number, x1: number, y1: number) =>
  (x1 - x0) ** 2 + (y1 - y0) ** 2;
