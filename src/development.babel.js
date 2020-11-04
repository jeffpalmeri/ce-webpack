const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const yargs = require('yargs');

const common = require('./common');

module.exports = function dev() {
  const { argv } = yargs;
  const getCommon = common(argv.env);
  const devServer = {
    contentBase: path.join(process.cwd(), 'dist'),
    watchContentBase: true,
    hot: true,
    host: '0.0.0.0',
    open: true,
    overlay: true,
    port: 3000,
    clientLogLevel: 'error',
  };
  const devConfig = {
    mode: 'development',
    devServer,
    devtool: 'eval-cheap-module-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
  };
  return merge(getCommon, devConfig);
};
