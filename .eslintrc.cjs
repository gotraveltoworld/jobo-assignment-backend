const path = require('path');

const resolveImports = (filePath) => path.resolve(__dirname, filePath);

module.exports = {
  env: {
    'browser': true,
    'es2021': true,
  },
  extends: ['google', 'plugin:import/errors', 'plugin:import/warnings'],
  parserOptions: {
    'ecmaVersion': 15,
    'sourceType': 'module',
  },
  rules: {
    'max-len': ['warn', {'code': 120}],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'import/order': [
      'error',
      {
        groups: [
          'builtin', 'external', 'internal', 'parent',
          'sibling', 'index', 'object',
        ],
        alphabetize: {
          order: 'asc'
          /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true, /* ignore case. Options: [true, false] */
        },
      },
    ],
    'no-var': 'error',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['#src', resolveImports('src')],
          ['#logger', resolveImports('src/utils/logger.js')],
          ['#constants', resolveImports('src/constants')],
          ['#middlewares', resolveImports('src/middlewares')],
          ['#models', resolveImports('src/models')],
          ['#utils', resolveImports('src/utils')],
          ['#errors', resolveImports('src/utils/errors.js')],
          ['#validators', resolveImports('src/validators')],
          ['#unitTest', resolveImports('tests/unitTest')],
        ],
      },
      node: {
        extensions: ['.js', '.json'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
