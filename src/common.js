import webpack from 'webpack';
import path from 'path';
import logger from 'node-color-log';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
import inlineGenerator from './inline-generator';
import manageBulkOutput from './manage-bulk-output';
import manageHtmlOutput from './manage-html-output';
import manageInlineOutput from './manage-inline-output';

const common = (init) => {
  const config = require(path.join(process.cwd(), init));
  const { entry, bulks, htmls, inlines, webpackConfig = {}, COPY_ARRAY = [], FAVICON } = config;
  if (!entry || typeof entry !== 'object') {
    throw Error('CE_CONFIG failed: <entry> option cannot be empty and must be an object');
  }
  if (!htmls || typeof entry !== 'object') {
    throw Error('CE_CONFIG failed: <htmls> option cannot be empty and must be an object');
  }
  if (!FAVICON || typeof FAVICON === 'undefined' || typeof FAVICON !== 'string') {
    throw Error('CE_CONFIG failed: Missing FAVICON, or incorrect type. Should be just a string!!');
  }
  if (typeof webpackConfig !== 'object') {
    throw Error('CE_CONFIG failed: <webpackConfig> incorrect type. Should be just an object!!');
  }
  if (bulks && typeof bulks !== 'object') {
    throw Error('CE_CONFIG failed: <bulks> is not an object');
  }
  if (inlines && typeof inlines !== 'object') {
    throw Error('CE_CONFIG failed: <inlines> is not an object');
  }

  const output = {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
    filename: 'js/[name].min.js',
  };

  const optimization = {
    runtimeChunk: 'single',
    chunkIds: 'size',
    flagIncludedChunks: true,
    splitChunks: {
      chunks: 'all',
      name: true,
      minSize: 1000 * 200,
      cacheGroups: {
        vendor: {
          chunks: 'all',
          minSize: 1000 * 200,
          name: true,
          test: /[\\/]node_modules[\\/]/,
        },
        common: {
          chunks: 'all',
          minSize: 1000 * 200,
          test: /[\\/]src[\\/]/,
        },
      },
    },
  };

  const resolve = {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      assets: path.join(process.cwd(), 'src', 'assets'),
      components: path.join(process.cwd(), 'src', 'components'),
      config: path.join(process.cwd(), 'src', 'config'),
      connectors: path.join(process.cwd(), 'src', 'connectors'),
      core: path.join(process.cwd(), 'src', 'core'),
      country: path.join(process.cwd(), 'src', 'country'),
      fonts: path.join(process.cwd(), 'src', 'fonts'),
      'hbs-partials': path.join(process.cwd(), 'src', 'hbs-partials'),
      scss: path.join(process.cwd(), 'src', 'scss'),
      shared: path.join(process.cwd(), 'src', 'shared'),
      variants: path.join(process.cwd(), 'src', 'variants'),
    },
  };

  const rules = [
    { parser: { requireEnsure: false } },
    htmlLoader,
    jsLoader,
    stylesLoader,
    imagesLoader,
    mediaLoader,
    fontLoader,
    handlebarLoader,
  ];

  const isWin = process.platform === 'win32';

  logger.color('yellow').log('··· System OS: %s ···\n', process.platform);

  const htmlsTemplates = htmlGenerator(manageHtmlOutput(htmls, FAVICON));
  const bulkPagesTemplates = bulks ? htmlGenerator(manageBulkOutput(bulks, FAVICON)) : [];

  const plugins = [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
    }),
    ...htmlsTemplates,
    ...bulkPagesTemplates,
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
  ];
  COPY_ARRAY.length && plugins.unshift(new CopyWebpackPlugin({ patterns: COPY_ARRAY }));
  !isWin && plugins.unshift(new CleanWebpackPlugin({ root: '', verbose: true, dry: false }));
  const excludeHtmlNames = [];
  if (Object.keys(inlines).length) {
    const inlineTemplates = inlineGenerator(manageInlineOutput(inlines), FAVICON);
    inlineTemplates.forEach(({ options }) => {
      excludeHtmlNames.push(options.filename);
    });
    plugins.push(...inlineTemplates);
  }

  return merge(
    {
      entry,
      output,
      optimization,
      resolve,
      module: {
        rules,
        strictExportPresence: true,
      },
      plugins,
    },
    webpackConfig
  );
};

export default common;
