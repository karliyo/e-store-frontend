/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { DefinePlugin, IgnorePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

process.traceDeprecation = true;

const CONST_BASE_PATH = process.env.BASE_PATH || '/';

const webpackConfig = {
  mode: 'production',
  entry: {
    client: [
      './src/index',
      'svgxuse'
    ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'front.[name].js',
    publicPath: CONST_BASE_PATH,
  },
  resolve: {
    alias: {
      lang: path.resolve(__dirname, './assets/lang'),
    },
  },
  stats: {
    children: false
  },
  plugins: [
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/, // only en locale from moment
      contextRegExp: /moment$/,
    }),
    new CopyWebpackPlugin([
      {
        from: './bundle/assets/resources',
        to: 'resources',
      },
    ]),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production'),
        BASE_PATH: JSON.stringify(CONST_BASE_PATH),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'E-store frontend',
      template: path.join(__dirname, './assets/index.html'),
      inject: false,
      title: 'E-store frontend',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
  ],
  optimization: {
    usedExports: true, // to remove unused exports
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      minSize: 30000,
    },
    noEmitOnErrors: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // use multi-process parallel running to improve the build speed
        sourceMap: false, // set to true if you want JS source maps
        terserOptions: {
          mangle: true, // pass false to skip mangling names
          toplevel: false, // set to true if you wish to enable top level variable and function name mangling and to drop unused variables and functions
          ie8: true, // set to true to support IE8.
          keep_fnames: false, // pass true to prevent discarding or mangling of function names
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
        canPrint: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true // true outputs JSX tags
        }
      },
      {
      test: /\.(js|jsx)$/, // allows both .jsx and .js
      exclude: /node_modules/,
      include: path.join(__dirname, '../src'),
      use: [
        {
          loader: 'babel-loader',
        },
      ],
    }, {
      test: /\.(sa|sc|c)ss$/,
      enforce: 'pre',
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: { modules: false },
        },
        {
          loader: "sass-loader"
        },
      ],
    }],
  },
};

module.exports = webpackConfig;
