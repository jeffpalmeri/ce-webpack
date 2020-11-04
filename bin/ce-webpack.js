#!/usr/bin/env node
/**
 * Copyright (c) 2020-present, Polpenaloza
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */
const yargs = require('yargs');
const { exec } = require('child_process');
const logger = require('node-color-log');

let showProcessingLog = true;
let timer = 0;

const showLog = (processText = 'Processing, hang tight') => {
  logger.bgColor('white').color('black').log(`    ${processText} -- ${timer} seconds passed   `);
};
const toggleProcessingLog = () =>
  setTimeout(() => {
    if (showProcessingLog) {
      timer++;
      showLog();
      toggleProcessingLog();
    }
  }, 1000);

const toGb = (value) => (value / 1024 / 1024 / 1024).toFixed(4);
const memoryUsage = (catchPhrase) => {
  const mu = process.memoryUsage();
  const gbUsed = toGb(mu.heapUsed);
  const gbTotal = toGb(mu.heapTotal);
  const gbResident = toGb(mu.rss);
  const colorLog = Number(gbTotal) < 2 ? 'green' : Number(gbTotal) > 2 && Number(gbTotal) < 3 ? 'yellow' : 'red';
  logger
    .color('black')
    .bgColor(colorLog)
    .log(`Memory used on ${catchPhrase}: ${gbUsed} GB, total: ${gbTotal} GB, resident: ${gbResident} GB`);
};

const { argv } = yargs.usage('$0 [options]', 'Build the project depending on the config env file.').option('env', {
  type: 'object',
  describe: 'Config Environment',
  default: './webpack/config.babel.js',
});

const cmd = ({ webpack, mode, build }) => {
  const config = `--config ${argv.config || 'node_modules/@ampush/ce-webpack/src'}/${build}.babel.js`;
  // const argvKeys = Object.keys(argv).filter((argKey) => '_ $0 init env config serve'.indexOf(argKey) === -1);
  // const stringifyArguments = argvKeys.map((argKey) => `--${argKey}=${argv[argKey]}`).join(' ');
  // eslint-disable-next-line max-len
  return `yarn run ${webpack} --mode ${mode} ${config} --env ${argv.init} --color`;
};

const webpack = argv.serve ? 'webpack serve --progress' : 'webpack';
const mode = argv.serve ? 'development' : 'production';
const build = argv.serve ? 'development' : 'production';
const command = cmd({ webpack, mode, build });
argv.verbose && logger.color('blue').log(JSON.stringify({ argv, command }));

memoryUsage('Start >>>');

const startNode = exec(command, { maxBuffer: 1024 * 1024 * 1024 * 1024 }, function cb(error, stdout) {
  showProcessingLog = false;
  if (error) {
    logger.info('\n>>> ERROR <<<\n');
    logger.error(error);
  }
  logger.info('\n>>> stdout <<<\n');
  logger.log(stdout);
});

!argv.serve && toggleProcessingLog();
if (module.hot) {
  module.hot.accept();
}

startNode.stdout.on('data', (data) => {
  if (argv.verbose) {
    memoryUsage('ongoing >>>');
  }
  logger.log(data);
});

startNode.stderr.on('data', (error) => {
  if (argv.verbose) {
    logger.log(error);
  }
});

startNode.on('close', function exit(code) {
  showProcessingLog = false;
  const logColor = Number(code) === 0 ? 'green' : 'red';
  memoryUsage('Closing >>>');
  showLog('Processed!');
  logger.color(logColor).dim().log(`Child process exited with code ${code}`);
  process.exit(code);
});
