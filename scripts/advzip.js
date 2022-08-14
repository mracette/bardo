import { execFile } from 'child_process';
import fs from 'fs';
import advzip from 'advzip-bin';
import { BUILD_FILE_COMPRESSED, BUILD_FILE_ADV_COMPRESSED } from './constants.js';

const main = () => {
  fs.copyFileSync(BUILD_FILE_COMPRESSED, BUILD_FILE_ADV_COMPRESSED);
  execFile(advzip, ['--recompress', '--shrink-insane', BUILD_FILE_ADV_COMPRESSED]);
  console.info('advzip complete: ' + BUILD_FILE_ADV_COMPRESSED);
};

main();
