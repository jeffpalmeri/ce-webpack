import merge from 'webpack-merge';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlMinifierPlugin from 'html-minifier-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack';

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

export default function (env) {
  const isProd = Boolean(env.prod);
  const getCommon = common(env);
  const prodConfig = {
    mode: 'production',
    devtool: !isProd ? 'source-map' : '',
    optimization: {
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: !isProd,
          uglifyOptions: {
            compress: {
              drop_console: isProd,
              booleans: false,
              collapse_vars: true,
              reduce_vars: true,
              loops: true,
            },
            output: {
              comments: false,
              beautify: false,
            },
          },
        }),
      ],
    },
  };
  return merge(getCommon, {
    ...prodConfig,
    plugins,
  });
}
