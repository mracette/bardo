const { execSync } = require('child_process');
const { prepend } = require('./prepend')

const {
  SOURCE_FOLDER,
  BUILD_FILE,
  BUILD_FILE_COMPRESSED,
  BUILD_FILE_ADV_COMPRESSED,
  COMMIT_LOG_PATH
} = require('./constants');

function getFileSize(path) {
  const stout = execSync(`stat -f '%z' ${path}`, {
    encoding: 'utf8'
  });
  const bytes = parseInt(stout);
  const kbs = (bytes / 1024).toFixed(2);
  return [kbs, bytes];
}

function getPercentageChange(a, b) {
  return `${a < b ? '-' : '+'}${Math.abs(Math.round((100 * (b - a)) / b))}%`;
}

function appendCommitLog() {
  let LOG_MESSAGE = '';

  // add the current date
  LOG_MESSAGE += `${new Date().toUTCString()}\n`;

  // add table header
  LOG_MESSAGE += `| Measure | Size (kb) | Size (bytes) | Reduction |\n`;
  LOG_MESSAGE += `| --- | --- | --- | --- |\n`;

  // build
  const [kb1, bytes1] = getFileSize(BUILD_FILE);
  LOG_MESSAGE += `| Build | ${kb1} kb | ${bytes1} | NA |\n`;

  // build compressed
  const [kb2, bytes2] = getFileSize(BUILD_FILE_COMPRESSED);
  LOG_MESSAGE += `| Compressed Build | ${kb2} kb | ${bytes2} | ${getPercentageChange(
    bytes2,
    bytes1
  )} |\n`;

  // build adv zip
  const [kb3, bytes3] = getFileSize(BUILD_FILE_ADV_COMPRESSED);
  LOG_MESSAGE += `| Compressed Build (Adv Zip) | ${kb3} kb | ${bytes3} | ${getPercentageChange(
    bytes3,
    bytes2
  )} |\n`;

  // update the log
  prepend(COMMIT_LOG_PATH, LOG_MESSAGE)
}

appendCommitLog();
