module.exports = {
  'parser': '@typescript-eslint/parser',
  'env': {
    'browser': true,
    'es6': true
  },
  'plugins': [
    '@typescript-eslint',
    'react',
    'prettier',
  ],
  'extends': [
    'react-app',
    'prettier/@typescript-eslint',
    'standard'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018
  },
  'rules': {
  }
}
