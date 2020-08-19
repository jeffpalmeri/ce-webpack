const webpack = require('webpack');
const path = require('path');
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
  const { entry, htmls, COPY_ARRAY = [], FAVICON, INLINE } = config;
  if (!entry || typeof entry !== 'object') {
    throw Error('CE_CONFIG failed: "entry" option cannot be empty and must be an object');
  }
  if (!htmls || typeof entry !== 'object') {
    throw Error('CE_CONFIG failed: "htmls" option cannot be empty and must be an object');
  }
  if (!FAVICON || typeof FAVICON === 'undefined' || typeof FAVICON !== 'string') {
    throw Error('CE_CONFIG failed: Missing FAVICON, or incorrect type. Should be just a strng!!');
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
    ...htmlGenerator(htmls, FAVICON),
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
  ];
  COPY_ARRAY.length && plugins.unshift(new CopyWebpackPlugin({ patterns: COPY_ARRAY }));
  !isWin && plugins.unshift(new CleanWebpackPlugin({ root: '', verbose: true, dry: false }));
  INLINE.length && plugins.concat(inlineGenerator(INLINE, FAVICON));

  plugins.push(new PreloadWebpackPlugin());

  return {
    entry,
    output,
    optimization,
    resolve,
    module: {
      rules,
      strictExportPresence: true,
    },
    plugins,
  };
};

module.exports = common;
