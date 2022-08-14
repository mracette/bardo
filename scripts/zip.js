import { execSync } from 'child_process';
import {
  BUILD_FOLDER,
  BUILD_FILE_NAME_COMPRESSED,
  BUILD_FILE_COMPRESSED
} from './constants.js';

execSync(`cd ${BUILD_FOLDER}; zip -r -j ${BUILD_FILE_NAME_COMPRESSED} ./*`);

console.info('zip complete: ' + BUILD_FILE_COMPRESSED);
