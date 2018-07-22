const webpack = require('webpack');
const shell = require('shelljs');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const oPath = require('../config/paths');
const config = require('../config/webpack.pro.config');

const cleanBuildFloder = () => {
  const { buildPath } = oPath;

  if (fs.existsSync(buildPath)) {
    shell.rm('-rf', buildPath);
  }
  if (!fs.existsSync(buildPath)) {
    shell.mkdir(buildPath);
  }
};

const build = () => {
  const start = new Date().getTime();
  console.log('clean build forlder');

  config.plugins.push(
    new HTMLWebpackPlugin({
      // generate HTML
      fileName: 'index.html',
      template: 'index.ejs',
      inject: false
    })
  );

  cleanBuildFloder();
  console.log('start to build');
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      if (err) {
        console.error(err);
        throw err;
      } else {
        const info = stats.toJson();
        if (stats.hasErrors()) {
          console.error(info.errors);
          throw new Error(info.errors);
        }
        if (stats.hasWarnings()) {
          console.log(info.warnings);
        }
      }
    } else {
      shell.cp(`${oPath.appDirectory}/package.json`, oPath.buildPath);
      console.log('Done, build time: ', (new Date().getTime() - start) / 1000, 's');
    }
  });
};

build();
