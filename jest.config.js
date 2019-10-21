module.exports = {
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        '<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer'
      ]
    }
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts']
};
