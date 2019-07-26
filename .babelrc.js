module.exports = (api) => {
  const plugins = [
    [
      'module-resolver', {
        root: [
          './src/ee',
          'assets'
        ],
        alias: {
          '@config': './src/config',
        },
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-classes',
    '@babel/plugin-proposal-optional-chaining'
  ];

  if (api.env('development')) {
    plugins.unshift('react-hot-loader/babel');
  }

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env', {
          useBuiltIns: 'usage',
          forceAllTransforms: true,
          targets: {
            browsers: [
              '>0.1%',
              'last 5 versions',
              'Firefox ESR',
              'ie >= 7'
            ]
          },
          corejs: 3,
        },
      ],
    ],
    plugins,
    env: {
      development: {
        presets: [],
      },
    },
  };
}
