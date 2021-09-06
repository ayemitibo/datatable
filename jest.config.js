// jest.config.js
module.exports = {
  moduleNameMapper: {
    '^/@src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/**/*.vue',
		'<rootDir>/src/**/*.ts',
	],
}
