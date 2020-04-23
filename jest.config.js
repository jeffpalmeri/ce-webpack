// Jest configuration
// https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
  // Modules can be explicitly auto-mocked using jest.mock(moduleName).
  // https://facebook.github.io/jest/docs/en/configuration.html#automock-boolean
  automock: false, // [boolean]

  // Respect Browserify's "browser" field in package.json when resolving modules.
  // https://facebook.github.io/jest/docs/en/configuration.html#browser-boolean
  browser: false, // [boolean]

  // This config option can be used here to have Jest stop running tests after the first failure.
  // https://facebook.github.io/jest/docs/en/configuration.html#bail-boolean
  bail: false, // [boolean]

  // The directory where Jest should store its cached dependency information.
  // https://facebook.github.io/jest/docs/en/configuration.html#cachedirectory-string
  // cacheDirectory: '/tmp/<path>', // [string]

  // Indicates whether the coverage information should be collected while executing the test.
  // Because this retrofits all executed files with coverage collection statements,
  // it may significantly slow down your tests.
  // https://facebook.github.io/jest/docs/en/configuration.html#collectcoverage-boolean
  collectCoverage: true, // [boolean]

  // https://facebook.github.io/jest/docs/en/configuration.html#collectcoveragefrom-array
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/*.css.{js}',
    '!**/node_modules/**',
    '!src/**/constants.js',
    '!src/**/constant.js',
  ],

  // https://facebook.github.io/jest/docs/en/configuration.html#coveragedirectory-string
  coverageDirectory: '<rootDir>/coverage', // [string]

  // coveragePathIgnorePatterns: // [array<string>]
  // coverageReporters: [], // [array<string>]
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      lines: 0,
      functions: 0,
    },
  },

  globals: {
    __DEV__: true,
  },

  // https://facebook.github.io/jest/docs/en/configuration.html#mapcoverage-boolean
  // mapCoverage: false, // [boolean]

  // The default extensions Jest will look for.
  // https://facebook.github.io/jest/docs/en/configuration.html#modulefileextensions-array-string
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],

  moduleDirectories: ['node_modules', '<rootDir>/src/'],

  // A map from regular expressions to module names that allow to stub out resources,
  // like images or styles with a single module.
  moduleNameMapper: {
    '\\.(css|less|styl|scss|sass|sss)$': 'identity-obj-proxy',
  },

  // modulePathIgnorePatterns: // [array<string>]
  // modulePaths: // [array<string>]
  notify: true, // [boolean]
  // preset: // [string]
  // projects: // [array<string>]
  // clearMocks: // [boolean]
  reporters: ['default', 'jest-stare'], // [array<moduleName | [moduleName, options]>]
  // resetMocks: // [boolean]
  // resetModules: // [boolean]
  // resolver: // [string]
  // rootDir: // [string]
  // roots: // [array<string>]
  // setupFiles: ['<rootDir>/src/extensions.polyfill.js'],
  // setupTestFrameworkScriptFile: '<rootDir>/test/setupTestFramework.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // testEnvironment: // [string]
  // testMatch: // [array<string>]
  // testPathIgnorePatterns: // [array<string>]
  // testRegex: // [string]
  // testResultsProcessor: // [string]
  // testRunner: // [string]
  // testURL: // [string]
  // timers: // [string]

  // transform: {
  //   '\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  //   '^(?!.*\\.(js|jsx|json|css|less|styl|scss|sass|sss)$)': '<rootDir>/tools/file-transformer.js',
  // },

  // transformIgnorePatterns: // [array<string>]
  // unmockedModulePathPatterns: // [array<string>]

  verbose: true, // [boolean]
};
