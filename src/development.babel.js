const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const common = require('./common');

module.exports = async function dev() {
  const asd = await require(`../../../development.babel`);
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
  return merge(common(asd), devConfig);
};
