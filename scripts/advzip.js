const { execFile } = require('child_process');
const fs = require('fs');
const advzip = require('advzip-bin');
const { BUILD_FILE_COMPRESSED, BUILD_FILE_ADV_COMPRESSED } = require('./constants');

const main = () => {
  fs.copyFileSync(BUILD_FILE_COMPRESSED, BUILD_FILE_ADV_COMPRESSED);
  execFile(advzip, ['--recompress', '--shrink-insane', BUILD_FILE_ADV_COMPRESSED]);
  console.info('advzip complete: ' + BUILD_FILE_ADV_COMPRESSED);
};

main();
