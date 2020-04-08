const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const yargs = require('yargs');

const common = require('./common');

const { argv } = yargs;

module.exports = async function dev() {
  // eslint-disable-next-line import/no-dynamic-require
  const cfg = await require(`../../../${argv.cfg}`);
  console.info({ cfg, param: argv.cgf });
  const devConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
    watch: true,
    watchOptions: {
      poll: true,
    },
    devServer: {
      contentBase: path.join(process.cwd(), 'dist'),
      disableHostCheck: true,
      historyApiFallback: true,
      hot: true,
      host: '0.0.0.0',
      open: true,
      overlay: true,
      port: 3000,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  };
  return merge(common(cfg), devConfig);
};
