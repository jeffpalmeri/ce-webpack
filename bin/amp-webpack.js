const yargs = require('yargs');

const devBuild = require('../src/dev.babel');
const prodBuild = require('../src/prod.babel');

const { argv } = yargs
  .usage(
    '$0 [options]',
    'Syncs a local directory to an AWS S3 bucket, optionally invalidating affected CloudFront paths.'
  )
  .option('env', {
    type: 'string',
    describe: 'Environment for build',
    default: 'dev',
  });

if (argv.env === 'prod') {
  prodBuild();
} else {
  devBuild();
}
