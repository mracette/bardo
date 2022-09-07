export const rotatePoint = (
  px: number,
  py: number,
  cx: number,
  cy: number,
  angle: number
) => {
  return [
    Math.cos(angle) * (px - cx) - Math.sin(angle) * (py - cy) + cx,
    Math.sin(angle) * (px - cx) + Math.cos(angle) * (py - cy) + cy
  ];
};
