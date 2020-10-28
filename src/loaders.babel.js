const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlLoader = {
  test: /\.html$/i,
  loader: 'html-loader',
  options: {
    minimize: true,
  },
};

const jsLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: false,
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-object-rest-spread'],
      },
    },
  ],
};

const stylesLoader = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
};

const imagesLoader = {
  test: /\.(gif|png|jpe?g|jp2|svg|ico)\??.*$/,
  use: [
    {
      loader: 'file-loader',
    },
  ],
};

const mediaLoader = {
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'media/[name].[ext]',
    },
  },
};

const fontLoader = {
  test: /\.(woff|woff2|otf|ttf|eot)\??.*$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'fonts/[name].[ext]',
    },
  },
};

const handlebarLoader = {
  test: /\.hbs$/,
  use: [
    {
      loader: 'handlebars-loader',
      query: {
        partialDirs: [path.join(process.cwd(), 'src', 'hbs-partials')],
      },
    },
  ],
};

module.exports = {
  htmlLoader,
  jsLoader,
  stylesLoader,
  imagesLoader,
  mediaLoader,
  fontLoader,
  handlebarLoader,
  // Some libraries import Node modules but don't use them in the browser.
  // Tell webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
