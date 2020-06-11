module.exports = {
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
  ],
  ignore: [
    "**/*.spec.ts"
  ]
};