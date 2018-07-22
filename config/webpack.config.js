const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const oPath = require('./paths');

const styleLoader = mode => [
  {
    loader: mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
  },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('autoprefixer')()]
    }
  }
];

module.exports = {
  entry: {
    main: ['./index']
  },
  output: {
    path: oPath.buildPath,
    filename: '[name].bundle.js',
    publicPath: oPath.publicURL,
    sourceMapFilename: '[name].map'
  },
  context: path.join(__dirname, '../src'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: styleLoader(this.mode)
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|sv)$/,
        use: 'file-loader'
      }
    ]
  }
};
