import { PI, TAU } from '../math/constants';

export const star = (x: number, y: number, size: number, numPoints = 5, inset = 0.4) => {
  const points = [];
  for (let i = 0, n = numPoints * 2; i <= n; i++) {
    const angle = -PI / (numPoints * 2) + TAU * (i / n);
    const mod = i % 2;
    points.push([
      x + Math.cos(angle) * (mod === 0 ? size : size * inset),
      y + Math.sin(angle) * (mod === 0 ? size : size * inset)
    ]);
  }
  return points;
};
