export const equilateralTriangle = (x: number, y: number, sideLength: number) => {
  const h = (sideLength * Math.sqrt(3)) / 2;
  return [
    [x, y - (2 * h) / 3],
    [x + sideLength / 2, y * (h / 3)],
    [x - sideLength / 2, y * (h / 3)]
  ];
};
