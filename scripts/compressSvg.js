import { readFileSync, writeFileSync } from 'fs';
import { pointsOnPath } from 'points-on-path';

// precision: who needs it?
const decimalRegex = new RegExp(/\.\d*(?=[\s\D])/, 'gm');
const pathRegex = new RegExp(/(?<=d=").*?(?=")/);

export const compressSvg = (path) => {
  const fileName = path.split('/').pop();
  const fileNameOnly = fileName.slice(0, fileName.indexOf('.'));
  const file = readFileSync(path, { encoding: 'utf-8' });
  const lines = file.split('\n');
  const pathsCombined = lines
    .map((line) => line.trim())
    .filter((line) => line.startsWith('<path'))
    .map((line) => line.replace(decimalRegex, ''))
    .map((line) => pathRegex.exec(line)[0])
    .join(' ');

  // the most compressed representation of the svg
  const pathToWriteMin = path.replace(fileName, '') + fileNameOnly + '.ts';
  const contentToWriteMin = `export const ${fileNameOnly} = ${JSON.stringify(
    pointsOnPath(pathsCombined, 5, 1).map((points) => points.map((a) => [~~a[0], ~~a[1]]))
  )};`;

  writeFileSync(pathToWriteMin, contentToWriteMin);
};
