import { merge } from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import yargs from 'yargs';

import common from './common';

export default function dev() {
  const { argv } = yargs;
  const getCommon = common(argv.init);
  const stats = argv.verbose ? 'verbose' : 'normal';
  const devServer = {
    contentBase: path.join(process.cwd(), 'dist'),
    watchContentBase: true,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    open: true,
    overlay: true,
    port: 3000,
  };
  const devConfig = {
    mode: 'development',
    devServer,
    devtool: 'eval-cheap-module-source-map',
    watch: true,
    watchOptions: {
      poll: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    stats,
  };
  return merge(getCommon, devConfig);
}
