const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  appDirectory,
  appSrc: path.join(appDirectory, 'src'),
  buildPath: path.join(appDirectory, './build'), // this could be changed according to your file location
  publicURL: '/'
};
