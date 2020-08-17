const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ImageminPlugin = require('imagemin-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const yargs = require('yargs');

const common = require('./common');

const minify = {
  collapseWhitespace: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
};

const imageminConfig = {
  bail: false,
  cache: true,
  name: '[path][name].[ext]',
  imageminOptions: {
    plugins: [
      ['gifsicle', { interlaced: true, optimizationLevel: 3 }],
      ['jpegtran', { progressive: true }],
      ['mozjpeg', { quality: 85 }],
      ['pngquant', { quality: [0.65, 0.8] }],
      [
        'imagemin-svgo',
        {
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        },
      ],
    ],
  },
};

const plugins = [
  new CompressionPlugin({
    test: /\.js$|\.css$|\.png$|\.jpg$|\.woff|\.woff2$/,
    threshold: 8192,
    minRatio: 0.7,
  }),
  new HtmlMinifierPlugin(minify),
];

const optimization = {
  removeAvailableModules: true,
  removeEmptyChunks: true,
  mergeDuplicateChunks: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        parallel: 2,
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
          drop_console: true,
        },
        mangle: {
          safari10: true,
        },
        keep_classnames: false,
        keep_fnames: false,
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
      sourceMap: true,
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        parser: safePostCssParser,
        map: {
          inline: false,
          annotation: true,
        },
      },
      cssProcessorPluginOptions: {
        preset: ['default', { minifyFontValues: { removeQuotes: false } }],
      },
    }),
    new ImageminPlugin(
      merge(imageminConfig, {
        // Only apply this one to files equal to or over 8192 bytes
        filter: (source) => source.byteLength >= 8192,
        imageminOptions: {
          plugins: [['jpegtran', { progressive: true }]],
        },
      })
    ),
    new ImageminPlugin(
      merge(imageminConfig, {
        // Only apply this one to files under 8192
        filter: (source) => source.byteLength < 8192,
        imageminOptions: {
          plugins: [['jpegtran', { progressive: false }]],
        },
      })
    ),
  ],
};

module.exports = function prod() {
  const { argv } = yargs;
  const isProd = Boolean(argv.env.prod);
  const getCommon = common(argv.init);
  const stats = argv.verbose ? 'verbose' : 'normal';
  const prodConfig = {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    stats,
  };
  if (isProd) {
    prodConfig.mode = 'production';
    prodConfig.plugins = plugins;
    prodConfig.optimization = optimization;
    delete prodConfig.devtool;
  }
  return merge(getCommon, prodConfig);
};
