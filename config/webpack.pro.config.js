const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const superConfig = require('./webpack.config');

module.exports = Object.assign({}, superConfig, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].style.[contenthash:8].css',
      chunkFilename: '[name].chunk.[contenthash:8].css'
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      ENV: '"production"',
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});
