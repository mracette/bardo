import { Canvas2DGraphicsRough } from 'crco-utils';
import { goat } from '../../svg/goat';
import { test } from '../../svg/test';
import { pointsOnPath } from '../util/pointsOnPath';

export const drawThirdEye = (graphics: Canvas2DGraphicsRough) => {
  // const points = pointsOnPath(test, 5, 1) as [number, number][][];
  // const points = pointsOnPath(test) as [number, number][][];
  // points.forEach((pointsArray, i) => {
  //   // graphics.lineSegments(pointsArray, { roughness: 50 });
  //   if (i === 3) {
  //     // eye shape top
  //     graphics.lineSegments(pointsArray, { fill: true });
  //   } else {
  //     graphics.lineSegments(pointsArray);
  //   }
  // });
};
