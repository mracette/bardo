const fs = require('fs');
const { COMMIT_LOG_PATH } = require('./constants');

/**
 * Adds the commit message to the commit log
 */
async function appendCommitLog() {
  const contents = fs.readFileSync(COMMIT_LOG_PATH);
  const file = fs.openSync(COMMIT_LOG_PATH, 'w+');
  const message = fs.readFileSync(process.argv[2], {encoding: 'utf-8'});
  const messageHeader = `## ${message}\n`;
  const buffer = Buffer.from(messageHeader);
  fs.writeSync(file, buffer, 0, buffer.length, 0);
  fs.writeSync(file, contents, 0, contents.length, buffer.length);
  fs.close(file);
}

appendCommitLog();
