import fs from 'fs';
import path from 'path';
import { compressSvg } from './compressSvg.js';

export const compressAllSvg = () => {
  const files = fs.readdirSync(path.resolve('svg'));
  files.forEach((file) => {
    if (file.endsWith('.svg')) {
      console.info(`compressing ${file}`);
      compressSvg(path.join('svg/', file));
    }
  });
};

compressAllSvg();
