const merge = require('webpack-merge');
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

const plugins = [
  new ImageminPlugin({
    bail: false,
    cache: true,
    name: '[path][name].[ext]',
    imageminOptions: {
      plugins: [
        ['gifsicle', { interlaced: true, optimizationLevel: 3 }],
        ['mozjpeg', { quality: 90, progressive: false }],
        ['pngquant', { quality: [0.5, 0.8] }],
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
  }),
  new CompressionPlugin({
    test: /\.js$|\.css$|\.png$|\.jpg$|\.woff|\.woff2$/,
    threshold: 8192,
    minRatio: 0.7,
  }),
  new HtmlMinifierPlugin(minify),
];

module.exports = function prod() {
  const { argv } = yargs;
  const isProd = Boolean(argv.env.prod);
  const getCommon = common(argv.init);
  const optimization = {
    minimize: true,
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
        sourceMap: !isProd,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: !isProd
            ? {
                inline: false,
                annotation: true,
              }
            : false,
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  };
  const stats = argv.verbose ? 'verbose' : 'normal';
  const prodConfig = {
    mode: !isProd ? 'development' : 'production',
    devtool: !isProd ? 'source-map' : '',
    optimization,
    plugins,
    stats,
  };
  return merge(getCommon, prodConfig);
};
