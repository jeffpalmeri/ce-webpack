const path = require('path');
const Autoprefixer = require('autoprefixer');
const Precss = require('precss');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const htmlLoader = {
  test: /\.html$/,
  loaders: ['file-loader?name=[name].html', 'extract-loader', 'html-loader'],
};

const jsLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'file-loader',
  },
};

const stylesLoader = {
  test: /(\.css|\.scss|\.sass)$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: ExtractCssChunks.loader,
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
      options: {
        autoprefixer: {
          browsers: ['last 2 versions'],
        },
        plugins: () => [Precss, Autoprefixer],
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
};

const imagesLoader = {
  test: /\.(gif|png|jpe?g|jp2|svg|ico)\??.*$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 4096,
        name: 'img/[name].[ext]',
      },
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
        mozjpeg: {
          progressive: true,
          quality: 75,
        },
      },
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
};
