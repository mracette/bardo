import fs from 'fs';
import { COMMIT_LOG_PATH } from './constants.js';
import { prepend } from './prepend.js';

/**
 * Adds the commit message to the commit log
 */
async function appendCommitLog() {
  const message = fs.readFileSync(process.argv[2], { encoding: 'utf-8' });
  const messageHeader = `## ${message}\n`;
  prepend(COMMIT_LOG_PATH, messageHeader);
}

appendCommitLog();
