/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const { DefinePlugin, IgnorePlugin } = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

process.traceDeprecation = true;

const IS_DEV = process.env.NODE_ENV === 'development';
const mode = IS_DEV ? 'development' : 'production';

const CONST_BASE_PATH = process.env.BASE_PATH || '/';

module.exports = {
  mode,
  entry: {
    client: [
      '../src/index',
      'svgxuse',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'pro.[name].js',
    publicPath: CONST_BASE_PATH,
  },
  resolve: {
    alias: {
      lang: path.resolve(__dirname, 'assets/lang'),
    },
  },
  plugins: [
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/, // only en locale from moment
      contextRegExp: /moment$/,
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets/resources',
        to: 'resources',
      },
    ]),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        BABEL_ENV: JSON.stringify(mode),
        BASE_PATH: JSON.stringify(CONST_BASE_PATH),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'E-store frontend',
      template: path.join(__dirname, 'assets/index.html'),
      inject: false,
    }),
  ],
};
