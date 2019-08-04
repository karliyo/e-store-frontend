const path = require('path');

const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const {
  DefinePlugin,
  IgnorePlugin,
  HotModuleReplacementPlugin,
} = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');

const common = require('./webpack.common');

const localhostApiURL = 'http://localhost:8080';
const localhostApiPaths = {
  refresh: '/refresh',
  api: '/api',
};

process.traceDeprecation = true;

const IS_DEV = process.env.NODE_ENV === 'development';
const mode = IS_DEV ? 'development' : 'production';

const CONST_BASE_PATH = process.env.BASE_PATH || (IS_DEV ? '/' : '');

const webpackConfig = {
  mode,
  devtool: 'inline-source-map',
  entry: {
    client: [
      './src/index',
      'core-js/stable',
      'regenerator-runtime/runtime',
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
  plugins: [
    new HardSourceWebpackPlugin.ExcludeModulePlugin([{
      test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    }]),
    new HardSourceWebpackPlugin({
      // Either an absolute path or relative to webpack's options.context.
      cacheDirectory: path.join(process.cwd(), 'node_modules/.cache/hard-source/', '[confighash]'),

      // Either a string of object hash function given a webpack config.
      // node-object-hash on npm can be used to build this.
      configHash: (webpackConfig) => require('node-object-hash')({ sort: false }).hash(webpackConfig),
      // Either false, a string, an object, or a project hashing function.
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ['package-lock.json', '.babelrc.js'],
      },
      info: {
        mode: 'none',
        level: 'debug',
      },
      // Clean up large, old caches automatically.
      cachePrune: {
        // Caches younger than `maxAge` are not considered for deletion.
        // They must be at least this old in milliseconds.
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
        // All caches together must be larger than `sizeThreshold` before any
        // caches will be deleted.
        // Together they must be at least this big in bytes.
        sizeThreshold: 50 * 1024 * 1024 // 50 MB
      },
    }),
    new HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: 8888,
      openAnalyzer: false,
    }),
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/, // only en locale from moment
      contextRegExp: /moment$/,
    }),
    new CopyWebpackPlugin([{
      from: './bundle/assets/resources',
      to: 'resources',
    }]),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        BABEL_ENV: JSON.stringify(mode),
        BASE_PATH: JSON.stringify(CONST_BASE_PATH),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'E-store frontend',
      template: path.join(__dirname, './assets/index.html'),
      inject: false,
      title: 'E-store frontend LOCAL',
    }),
  ],
  optimization: {
    usedExports: true, // to remove unused exports
    splitChunks: {
      chunks: 'all',
    },
    noEmitOnErrors: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['babel-loader', 'react-svg-loader'],
      },
      {
        test: /\.(js|jsx)$/, // allows both .jsx and .js
        exclude: /node_modules/,
        include: path.join(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: true,
    inline: true,
    compress: true, // gzipped
    open: false, // opens browser to frontend URL
    historyApiFallback: {
      // otherwise ../URL paths will return `CANNOT GET /URL`
      rewrites: [{
          from: /^\/$/,
          to: '/index.html',
        },
      ],
    },
    after: (app) => {
      app
        .use(history())
        .use(proxy(localhostApiPaths.api, {
          target: localhostApiURL,
          changeOrigin: true,
        }))
        .use(proxy(localhostApiPaths.refresh, {
          target: localhostApiURL,
          changeOrigin: true,
        }));
    },
  },
};

module.exports = webpackConfig;
