module.exports = (api) => {
  api.cache(true);

  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          browsers: ['last 3 version', 'ie >= 11'],
        },
      },
    ],
  ];
  const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-default-from',
    'add-module-exports',

    // Stage 2 https://github.com/babel/babel/tree/master/packages/babel-preset-stage-2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',

    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-json-strings',
    [
      'module-resolver',
      {
        alias: {
          assets: './src/assets',
          config: './src/config',
          connectors: './src/connectors',
          core: './src/core',
          country: './src/country',
          'hbs-partials': './src/hbs-partials',
          scss: './src/scss',
          shared: './src/shared',
          variants: './src/variants',
        },
        root: ['./src', './public', './'],
      },
    ],
    'transform-imports',
  ];

  return {
    presets,
    plugins,
  };
};
