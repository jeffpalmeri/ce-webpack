const yargs = require('yargs');

const devBuild = require('../src/dev.babel');
const prodBuild = require('../src/prod.babel');

const { argv } = yargs.usage('$0 [options]', 'Build the project depending on the desired env.').option('env', {
  type: 'string',
  describe: 'Environment for build',
  default: 'dev',
});

if (argv.env === 'prod') {
  prodBuild();
} else {
  devBuild();
}
