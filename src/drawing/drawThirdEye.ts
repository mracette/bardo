import { Canvas2DGraphicsRough } from "crco-utils";
import { goat } from "../../svg/goat";
import { pointsOnPath } from "../util/pointsOnPath";

export const drawThirdEye = (graphics: Canvas2DGraphicsRough) => {
    const points = pointsOnPath(goat, 5, 1) as [number, number][][];
    points.forEach((pointsArray) => {
        graphics.lineSegments(pointsArray, {roughness: 50});
    })
}