import { PI, TAU } from '../math/constants';

export const polygon = (x: number, y: number, size: number, numPoints = 5) => {
  const points = [];
  for (let i = 0, n = numPoints; i <= n; i++) {
    const angle = -PI / (numPoints * 2) + TAU * (i / n);
    points.push([x + Math.cos(angle) * size, y + Math.sin(angle) * size]);
  }
  return points;
};
