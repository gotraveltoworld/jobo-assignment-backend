module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    'lodash-es/isEmpty.js': 'lodash/isEmpty.js',
    'lodash-es/isNil.js': 'lodash/isNil.js',
    'lodash-es/isUndefined.js': 'lodash/isUndefined.js',
    'lodash-es/omitBy.js': 'lodash/omitBy.js',
    '^#src(.*)$': '<rootDir>/src$1',
    '^#logger(.*)$': '<rootDir>/src/utils/logger.js',
    '^#constants(.*)$': '<rootDir>/src/constants$1',
    '^#middlewares(.*)$': '<rootDir>/src/middlewares$1',
    '^#externalServices(.*)$': '<rootDir>/src/externalServices$1',
    '^#models(.*)$': '<rootDir>/src/models$1',
    '^#utils(.*)$': '<rootDir>/src/utils$1',
    '^#validators(.*)$': '<rootDir>/src/validators$1',
    '^#errors$': '<rootDir>/src/utils/errors.js',
    '^#unitTest(.*)$': '<rootDir>/tests/unitTest$1',
  },
  coveragePathIgnorePatterns: ['node_modules', 'tests', 'src/model'],
  coverageDirectory: 'coverage',
};
