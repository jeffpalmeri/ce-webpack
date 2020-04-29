const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

const common = (init) => {
  const config = require(path.join(process.cwd(), init));
  const { entry, htmls, COPY_ARRAY = [], FAVICON = '', INLINE = {} } = config;
  if (!entry || typeof entry !== 'object') {
    throw Error('CE_CONFIG failed: "entry" option cannot be empty and must be an object');
  }
  if (!htmls || typeof entry !== 'object') {
    throw Error('CE_CONFIG failed: "htmls" option cannot be empty and must be an object');
  }

  const output = {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
    filename: 'js/[name].min.js',
    chunkFilename: 'js/[name].min.js',
  };

  const optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: '/',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          minChunks: 5,
        },
        styles: {
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  };

  const resolve = {
    extensions: ['.js', '.jsx'],
    // alias: {
    //   assets: path.join(process.cwd(), 'src', 'assets'),
    //   components: path.join(process.cwd(), 'src', 'components'),
    //   config: path.join(process.cwd(), 'src', 'config'),
    //   connectors: path.join(process.cwd(), 'src', 'connectors'),
    //   core: path.join(process.cwd(), 'src', 'core'),
    //   country: path.join(process.cwd(), 'src', 'country'),
    //   fonts: path.join(process.cwd(), 'src', 'fonts'),
    //   'hbs-partials': path.join(process.cwd(), 'src', 'hbs-partials'),
    //   scss: path.join(process.cwd(), 'src', 'scss'),
    //   shared: path.join(process.cwd(), 'src', 'shared'),
    //   variants: path.join(process.cwd(), 'src', 'variants'),
    // },
  };

  const rules = [htmlLoader, jsLoader, stylesLoader, imagesLoader, mediaLoader, fontLoader, handlebarLoader];

  const isWin = process.platform === 'win32';

  console.info('··· System OS: %s ···\n', process.platform);

  const inlineConfig = INLINE ? htmlGenerator(INLINE, FAVICON) : [];

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
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
      chunkFilename: 'css/[id].min.css',
    }),
    ...htmlGenerator(htmls, FAVICON),
    // ...inlineConfig,
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'inline.hbs'),
      filename: 'inline',
      inlineSource: /.js$/,
      chunks: ['inline-js'],
    }),
    inlineConfig.length && new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
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

module.exports = common;
