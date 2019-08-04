module.exports = {
  parser: 'babel-eslint',
  env: {
    'browser': true,
    'es6': true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: [
    'jsx-a11y',
    'import',
    'react',
    'jest'
  ],
  extends: [
    'airbnb',
    'plugin:jest/recommended'
  ],
  settings: {
    'import/resolver': {
      'babel-module': {
        root: [
          "./src/ee",
          "assets"
        ],
        extensions: ['.js', '.json'],
        alias: {
          '@config': './src/config',
        },
      },
    },
  },
  rules: {
    'no-tabs': 0,
    'react/jsx-filename-extension': [1, {
      'extensions': [
        '.js',
        '.jsx'
      ],
    }],
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/prefer-stateless-function': 0,
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'only-multiline'
    }],
    'linebreak-style': 0,
    'no-case-declarations': 0,
    'react/destructuring-assignment': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'react/require-default-props': 0,
    'import/no-named-as-default': 0,
    'react/style-prop-object': 0,
    'import/prefer-default-export': 0,
  },
};
