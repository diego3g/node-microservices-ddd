const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { name } = require('./package.json');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  displayName: name,
  name,
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: '<rootDir>' }
  )
};
