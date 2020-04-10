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
    default: 'webpack/init.js',
  });

const cmd = ({ webpack, mode, build }) => {
  const config = argv.config || 'node_modules/amp-webpack/src';
  return `yarn run ${webpack} --mode ${mode} --config ${config}/${build}.babel.js --env ${mode} --init ${argv.init}`;
};

const webpack = argv.env.prod || argv.env.qa ? 'webpack' : 'webpack-dev-server --progress';
const mode = argv.env.prod ? 'production' : 'development';
const build = argv.env.prod || argv.env.qa ? 'production' : 'development';
const command = cmd({ webpack, mode, build });

const startNode = exec(command, { maxBuffer: 1024 * 10000 }, function asd(error) {
  if (error) {
    console.error({
      success: false,
      error,
      command,
    });
  }
});
startNode.stdout.on('data', (data) => {
  console.info(data);
});
startNode.on('close', function exit() {
  process.exit();
});
