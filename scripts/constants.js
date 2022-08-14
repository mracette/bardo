import path from 'path';

export const ROOT_FOLDER = path.resolve('.');
export const BUILD_FOLDER = 'build';
export const BUILD_FILE_NAME_COMPRESSED = 'build.zip';
export const BUILD_FILE_NAME_ADV_COMPRESSED = 'build-final.zip';
export const SOURCE_FOLDER = path.join(ROOT_FOLDER, 'src');
export const BUILD_FILE = path.join(ROOT_FOLDER, BUILD_FOLDER, 'index.html');
export const BUILD_FILE_COMPRESSED = path.join(
  ROOT_FOLDER,
  BUILD_FOLDER,
  BUILD_FILE_NAME_COMPRESSED
);
export const BUILD_FILE_ADV_COMPRESSED = path.join(
  ROOT_FOLDER,
  BUILD_FOLDER,
  BUILD_FILE_NAME_ADV_COMPRESSED
);
export const COMMIT_LOG_PATH = path.join(ROOT_FOLDER, 'markdown', 'commit-log.md');
