import { Canvas2DGraphicsRough } from 'crco-utils';
import { goat } from '../../svg/goat';
import { test } from '../../svg/test.min';
import { pointsOnPath } from '../util/pointsOnPath';

export const drawThirdEye = (graphics: Canvas2DGraphicsRough) => {
  test.forEach((pointsArray, i) => {
    // graphics.lineSegments(pointsArray, { roughness: 50 });
    // if (i === 3) {
    // eye shape top
    //   graphics.lineSegments(pointsArray, { fill: true });
    // } else {
    graphics.lineSegments(pointsArray);
    pointsArray.forEach((point) => graphics.circle(point[0], point[1], 0.0));

    // }
  });
};
