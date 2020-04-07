const yargs = require('yargs');

const devBuild = require('../src/dev.babel');
const prodBuild = require('../src/prod.babel');

const { argv } = yargs
  .usage('$0 [options]', 'Build the project depending on the desired env.')
  .option('config', {
    type: 'string',
    describe: 'Config for build',
    default: 'dev.babel',
  })
  .option('env', {
    type: 'string',
    describe: 'Environment for build',
    default: 'dev',
  });

console.info('ARGV: ', JSON.stringify({ argv }, 0, 2));
if (argv.config) {
  // eslint-disable-next-line import/no-dynamic-require
  const config = require(`../../../${argv.config}`);
  console.info({ config });
}

if (argv.env === 'prod') {
  prodBuild();
} else {
  devBuild();
}
