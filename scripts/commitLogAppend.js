const fs = require('fs');
const { COMMIT_LOG_PATH } = require('./constants');
const { prepend } = require('./prepend')

/**
 * Adds the commit message to the commit log
 */
async function appendCommitLog() {  
  const message = fs.readFileSync(process.argv[2], {encoding: 'utf-8'});
  const messageHeader = `## ${message}\n`;
  prepend(COMMIT_LOG_PATH, messageHeader)
}

appendCommitLog();