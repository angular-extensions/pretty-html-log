module.exports = {
  globals: {
    'ts-jest': {
      tsConfig:
        '<rootDir>/projects/pretty-html-log-showcase/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        '<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer'
      ]
    }
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts']
};
