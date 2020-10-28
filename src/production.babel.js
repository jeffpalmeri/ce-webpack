import { merge } from 'webpack-merge';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlMinifierPlugin from 'html-minifier-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import safePostCssParser from 'postcss-safe-parser';
import ImageminPlugin from 'imagemin-webpack';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import yargs from 'yargs';

import common from './common';

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
      ['webp', { quality: 70 }],
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
  minimize: true,
  removeAvailableModules: true,
  removeEmptyChunks: true,
  mergeDuplicateChunks: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        parallel: false,
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
      sourceMap: false,
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
          plugins: [['webp', { progressive: true }]],
        },
      })
    ),
    new ImageminPlugin(
      merge(imageminConfig, {
        // Only apply this one to files under 8192
        filter: (source) => source.byteLength < 8192,
        imageminOptions: {
          plugins: [['webp', { lossless: true }]],
        },
      })
    ),
  ],
};

export default function prod() {
  const { argv } = yargs;
  const isProd = Boolean(argv.env.prod);
  const getCommon = common(argv.init);
  const stats = argv.verbose ? 'verbose' : 'normal';
  const defaultConfig = {
    mode: 'development',
    stats,
  };
  const prodConfig = merge(
    defaultConfig,
    isProd
      ? {
          mode: 'production',
          plugins,
          optimization,
        }
      : {
          devtool: 'eval-cheap-source-map',
        }
  );
  return merge(getCommon, prodConfig);
}
