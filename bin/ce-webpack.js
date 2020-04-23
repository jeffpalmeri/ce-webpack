#!/usr/bin/env node
/**
 * Copyright (c) 2020-present, Polpenaloza
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */
const yargs = require('yargs');
const { exec } = require('child_process');

const { argv } = yargs
  .usage('$0 [options]', 'Build the project depending on the desired env.')
  .option('env', {
    type: 'object',
    describe: 'Environment',
    default: { dev: true },
  })
  .option('init', {
    type: 'string',
    describe: '',
    default: 'webpack/config.js',
  });

const cmd = ({ webpack, mode, build }) => {
  const config = argv.config || 'node_modules/ce-webpack/src';
  const [envKey] = Object.keys(argv.env);
  return `
    \n
    yarn run ${webpack} ${mode} --config ${config}/${build}.babel.js --env.${envKey} --init ${argv.init}
    \n
  `;
};

const webpack = argv.serve ? 'webpack-dev-server --progress' : 'webpack';
const mode = argv.env.dev ? '' : '-p';
const build = argv.serve ? 'development' : 'production';
const command = cmd({ webpack, mode, build });
console.info(JSON.stringify({ argv, command }, null, 2));

const startNode = exec(command, { maxBuffer: 1024 * 10000 }, function asd(error) {
  if (error) {
    console.error({
      success: false,
      error,
    });
  } else if (module.hot) {
    module.hot.accept();
  }
});
startNode.stdout.on('data', (data) => {
  console.info(data);
});
startNode.on('close', function exit() {
  process.exit();
});
