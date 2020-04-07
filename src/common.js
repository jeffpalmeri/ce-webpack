import webpack from 'webpack';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';

import {
  htmlLoader,
  jsLoader,
  stylesLoader,
  imagesLoader,
  mediaLoader,
  fontLoader,
  handlebarLoader,
} from './loaders.babel';

import htmlGenerator from './html-generator';

const common = () => {
  const { AMP_CONFIG = {} } = process;
  const { entry, htmls, COPY_ARRAY = [], FAVICON = '', PLOVER = [] } = AMP_CONFIG;
  if (!entry || typeof entry !== 'object') {
    throw Error('AMP_CONFIG failed: "entry" option cannot be empty and must be an object');
  }
  if (!htmls || typeof entry !== 'object') {
    throw Error('AMP_CONFIG failed: "htmls" option cannot be empty and must be an object');
  }

  const output = {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
    filename: 'js/[name].min.js',
    chunkFilename: 'js/[name].min.js',
  };

  const optimization = {
    runtimeChunk: 'single',
    namedChunks: true,
    splitChunks: {
      chunks: 'async',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: '/',
      name: 'common-chunk',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'async',
          name: 'vendor',
        },
      },
    },
  };

  const resolve = {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.join(process.cwd(), 'src', 'components'),
      fonts: path.join(process.cwd(), 'src', 'fonts'),
      shared: path.join(process.cwd(), 'src', 'shared'),
    },
  };

  const rules = [htmlLoader, jsLoader, stylesLoader, imagesLoader, mediaLoader, fontLoader, handlebarLoader];

  const ploverConfig = PLOVER.length
    ? PLOVER.map(
        ({ template, filename, chunks }) =>
          new HtmlWebpackPlugin({
            template,
            filename,
            chunks,
            inlineSource: /.js$/,
            favicon: FAVICON,
          })
      )
    : [];

  const isWin = process.platform === 'win32';

  console.info('··· System OS: %s ···\n', process.platform);

  const plugins = [
    new webpack.ProgressPlugin(),
    !isWin &&
      new CleanWebpackPlugin({
        root: '',
        verbose: true,
        dry: false,
      }),
    new CopyWebpackPlugin(COPY_ARRAY),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
    }),
    ...htmlGenerator(htmls),
    ...ploverConfig,
    new ExtractCssChunks({
      filename: 'css/[name].min.css',
    }),
    PLOVER.length && new HtmlWebpackInlineSourcePlugin(),
  ].filter((plug) => plug);

  return {
    entry,
    output,
    optimization,
    resolve,
    module: {
      rules,
    },
    plugins,
  };
};

export default common;
