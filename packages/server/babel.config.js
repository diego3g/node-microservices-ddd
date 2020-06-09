const { workspaces = [] } = require('../../package.json');

module.exports = {
  babelrcRoots: [
    '.', 
    ...workspaces
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ["module-resolver", {
      alias: {
        "@modules": "./src/modules",
        "@core": "./src/core",
        "@shared": "./src/shared",
        "@infra": "./src/infra",
        "@config": "./src/config"
      }
    }]
  ]
};