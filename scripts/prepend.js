import fs from 'fs';

export const prepend = (path, content) => {
  const existing = fs.readFileSync(path);
  const file = fs.openSync(path, 'w+');
  const buffer = Buffer.from(content);
  fs.writeSync(file, buffer, 0, buffer.length, 0);
  fs.writeSync(file, existing, 0, existing.length, buffer.length);
  fs.close(file);
};
