/** @type {import('jest').Config} */
module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'node'
};