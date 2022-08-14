import { readdirSync } from 'fs';
import { join, resolve } from 'path';
import { compressSvg } from './compressSvg.js';

export const compressAllSvg = () => {
  const files = readdirSync(resolve('svg'));
  files.forEach((file) => {
    if (file.endsWith('.svg')) {
      console.info(`compressing ${file}`);
      compressSvg(join('svg/', file));
    }
  });
};

compressAllSvg();
