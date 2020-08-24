const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

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
  const { entry, htmls, webpackConfig = {}, COPY_ARRAY = [], FAVICON, INLINE, META_TAGS } = config;
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
  if (META_TAGS && typeof META_TAGS !== 'object') {
    throw Error('CE_CONFIG failed: webpackConfig incorrect type. Should be just an object!!');
  }

  const output = {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
    filename: 'js/[name].min.js',
  };

  const optimization = {
    runtimeChunk: 'single',
    namedChunks: true,
    splitChunks: {
      chunks: 'all',
      name: false,
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

  console.info('··· System OS: %s ···\n', process.platform);

  const plugins = [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
    }),
    ...htmlGenerator(htmls, FAVICON, META_TAGS),
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
  ];
  COPY_ARRAY.length && plugins.unshift(new CopyWebpackPlugin({ patterns: COPY_ARRAY }));
  !isWin && plugins.unshift(new CleanWebpackPlugin({ root: '', verbose: true, dry: false }));
  INLINE.length && plugins.concat(inlineGenerator(INLINE, FAVICON));

  plugins.push(new PreloadWebpackPlugin());

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
