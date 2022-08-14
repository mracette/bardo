import { readFileSync, writeFileSync } from 'fs';
import { parsePath } from 'path-data-parser';
// import * as parser from "path-data-parser";

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

  const pathToWrite = path.replace(fileName, '') + fileNameOnly + '.ts';
  const contentToWrite = `export const ${fileNameOnly} = ${JSON.stringify(
    // parsePath(pathsCombined)
    pathsCombined
  )};`;
  writeFileSync(pathToWrite, contentToWrite);
};
