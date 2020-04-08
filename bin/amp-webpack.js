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
  .option('cfg', {
    type: 'string',
    describe: '',
    default: 'webpack/development.js',
  })
  .option('build', {
    type: 'string',
    describe: 'Build',
  });

const cmd = ({ webpack, mode, build }) => {
  const config = argv.config || 'node_modules/amp-webpack/src';
  return `yarn run ${webpack} --mode ${mode} --config ${config}/${build}.babel.js --env ${mode} --cfg ${argv.cfg}`;
};

const webpack = argv.build || argv.env.prod ? 'webpack' : 'webpack-dev-server --progress';
const mode = argv.build || argv.env.prod ? 'production' : 'development';
const build = argv.build ? 'production' : 'development';

exec(cmd({ webpack, mode, build }), function asd(error, stdout, stderr) {
  if (error) {
    console.error({
      success: false,
      stderr,
      error,
      command: cmd({ webpack, mode, build }),
    });
  } else {
    console.info({
      success: true,
      stderr,
      command: cmd({ webpack, mode, build }),
      result: stdout,
    });
  }
});
