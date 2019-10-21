const baseConfig = require('../../jest.config.js');

module.exports = {
  ...baseConfig,
  globals: {
    'ts-jest': {
      ...baseConfig.globals['ts-jest'],
      tsConfig: '<rootDir>/projects/pretty-html-log-showcase/tsconfig.spec.json'
    }
  },
  roots: ['<rootDir>/projects/pretty-html-log-showcase/src'],
  rootDir: '../../'
};
