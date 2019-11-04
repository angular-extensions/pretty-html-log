const baseConfig = require('../../jest.config.js');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['<rootDir>../../setupJest.ts', './setupJest.ts']
};
