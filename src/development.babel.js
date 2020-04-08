const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const common = require('./common');

module.exports = function dev(env = {}) {
  const getCommon = common(env);
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
