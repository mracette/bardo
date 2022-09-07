import { distance } from './distance';

export const circleCircleCollision = (
  x0: number,
  y0: number,
  r0: number,
  x1: number,
  y1: number,
  r1: number
) => distance(x0, y0, x1, y1) <= r0 + r1;

export const rectangleRectangleCollision = (
  x0: number,
  y0: number,
  w0: number,
  h0: number,
  x1: number,
  y1: number,
  w1: number,
  h1: number
) => !(y0 + h0 < y1 || y0 > y1 + h1 || x0 + w0 < x1 || x0 > x1 + w1);
