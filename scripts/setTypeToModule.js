import fs from 'fs';
import path from 'path';

/**
 * in order to import these libs for use with node scripts
 * "type" must be set to "module" in package.json
 */
const libsToModify = ['points-on-path', 'points-on-curve', 'path-data-parser'];

const setTypeToModule = (packageName) => {
  const fullPath = path.join('node_modules', packageName, 'package.json');
  const content = fs.readFileSync(fullPath, {
    encoding: 'utf-8'
  });
  const newContent = { ...JSON.parse(content) };
  newContent.type = 'module';
  fs.writeFileSync(fullPath, JSON.stringify(newContent), { encoding: 'utf-8' });
};

libsToModify.forEach((lib) => {
  setTypeToModule(lib);
});
