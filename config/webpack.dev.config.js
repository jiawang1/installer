const webpack = require('webpack');
const superConfig = require('./webpack.config');
const oPath = require('./paths');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, superConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  cache: true,
  devServer: {
    contentBase: oPath.appSrc,
    allowedHosts: ['localhost'],
    hot: true,
    noInfo: false,
    index: 'index.html',
    publicPath: oPath.publicURL
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      ENV: '"development"',
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HTMLWebpackPlugin({
      inject: true,
      fileName: 'index.html',
      template: `${oPath.appSrc}/index.ejs`
    })
  ]
});
