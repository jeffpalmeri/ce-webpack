const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const yargs = require('yargs');

const common = require('./common');

module.exports = function dev() {
  const { argv } = yargs;
  const getCommon = common(argv.init);
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
  return merge(getCommon, devConfig);
};
