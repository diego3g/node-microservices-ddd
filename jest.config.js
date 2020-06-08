module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  projects: [
    "<rootDir>/packages/server/**/jest.config.js"
  ],
  testEnvironment: "node",
  testMatch: [
    "*.spec.ts"
  ]
};
