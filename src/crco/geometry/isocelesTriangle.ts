export const isocelesTriangle = (
  x: number,
  y: number,
  sideOne: number,
  sideTwo: number
) => {
  const h = Math.sqrt((sideTwo * sideTwo) / 4 - sideOne * sideOne);
  return [
    [x, y - (2 * h) / 3],
    [x + sideTwo / 2, y * (h / 3)],
    [x - sideTwo / 2, y * (h / 3)]
  ];
};
