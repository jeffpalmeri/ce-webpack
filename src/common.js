const webpack = require('webpack');
const path = require('path');
const logger = require('node-color-log');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
  htmlLoader,
  jsLoader,
  stylesLoader,
  imagesLoader,
  mediaLoader,
  fontLoader,
  handlebarLoader,
} = require('./loaders.babel');

const htmlGenerator = require('./html-generator');
const inlineGenerator = require('./inline-generator');

const common = (init) => {
  const config = require(path.join(process.cwd(), init));
  const { entry, htmls, inlines, webpackConfig = {}, COPY_ARRAY = [], FAVICON } = config;
  if (!entry || typeof entry !== 'object') {
    throw Error('CE_CONFIG failed: "entry" option cannot be empty and must be an object');
  }
  if (!htmls || typeof entry !== 'object') {
    throw Error('CE_CONFIG failed: "htmls" option cannot be empty and must be an object');
  }
  if (!FAVICON || typeof FAVICON === 'undefined' || typeof FAVICON !== 'string') {
    throw Error('CE_CONFIG failed: Missing FAVICON, or incorrect type. Should be just a string!!');
  }
  if (typeof webpackConfig !== 'object') {
    throw Error('CE_CONFIG failed: webpackConfig incorrect type. Should be just an object!!');
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

  const htmlsTemplates = htmlGenerator(htmls, FAVICON);

  const plugins = [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
    }),
    ...htmlsTemplates,
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
  ];
  COPY_ARRAY.length && plugins.unshift(new CopyWebpackPlugin({ patterns: COPY_ARRAY }));
  !isWin && plugins.unshift(new CleanWebpackPlugin({ root: '', verbose: true, dry: false }));
  const excludeHtmlNames = [];
  if (Object.keys(inlines).length) {
    const inlineTemplates = inlineGenerator(inlines, FAVICON);
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

module.exports = common;
