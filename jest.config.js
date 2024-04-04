export default {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(css|sass)$": "identity-obj-proxy",
        "^.+\\.(css|less|scss)$": "babel-jest"
      },
}