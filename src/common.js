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
const manageBulkOutput = require('./manage-bulk-output');
const manageHtmlOutput = require('./manage-html-output');
const manageInlineOutput = require('./manage-inline-output');

const common = (init) => {
  const config = require(path.join(process.cwd(), init));
  const { entry, bulks, htmls, inlines, webpackConfig = {}, COPY_ARRAY = [], FAVICON } = config;
  if (!entry || typeof entry !== 'object' || !Array.isArray(entry)) {
    throw Error('CE_CONFIG failed: <entry> option cannot be empty and must be an array');
  }
  if (!htmls || typeof htmls !== 'object' || Array.isArray(htmls)) {
    throw Error('CE_CONFIG failed: <htmls> option cannot be empty and must be an object');
  }
  if (!FAVICON || typeof FAVICON === 'undefined' || typeof FAVICON !== 'string') {
    throw Error('CE_CONFIG failed: Missing FAVICON, or incorrect type. Should be just a string!!');
  }
  if (typeof webpackConfig !== 'object' || Array.isArray(webpackConfig)) {
    throw Error('CE_CONFIG failed: <webpackConfig> incorrect type. Should be just an object!!');
  }
  if (bulks && typeof bulks !== 'object' && Array.isArray(bulks)) {
    throw Error('CE_CONFIG failed: <bulks> is not an object');
  }
  if (inlines && typeof inlines !== 'object' && Array.isArray(inlines)) {
    throw Error('CE_CONFIG failed: <inlines> is not an object');
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
      minSize: 1000 * 200,
      cacheGroups: {
        vendor: {
          chunks: 'all',
          minSize: 1000 * 200,
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  };

  const resolve = {
    extensions: ['.scss', '.js', '.jsx', '.ts', '.tsx', '.json', '.png', '.gif', '.jpg', '.svg'],
    alias: {
      assets: path.join(process.cwd(), 'src', 'assets'),
      components: path.join(process.cwd(), 'src', 'components'),
      config: path.join(process.cwd(), 'src', 'config'),
      connectors: path.join(process.cwd(), 'src', 'connectors'),
      core: path.join(process.cwd(), 'src', 'core'),
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

  const htmlsTemplates = htmlGenerator(manageHtmlOutput(htmls, FAVICON));
  const bulkPagesTemplates = bulks ? htmlGenerator(manageBulkOutput(bulks, FAVICON)) : [];

  const plugins = [
    new webpack.ProgressPlugin(),
    ...htmlsTemplates,
    ...bulkPagesTemplates,
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
    require('autoprefixer'),
  ];
  COPY_ARRAY.length && plugins.unshift(new CopyWebpackPlugin({ patterns: COPY_ARRAY }));
  !isWin && plugins.unshift(new CleanWebpackPlugin({ root: '', verbose: true, dry: false }));
  const excludeHtmlNames = [];
  if (Object.keys(inlines).length) {
    const inlineTemplates = inlineGenerator(manageInlineOutput(inlines), FAVICON);
    inlineTemplates.forEach(({ options }) => {
      excludeHtmlNames.push(options.filename);
    });
    plugins.push(...inlineTemplates);
  }

  return merge(
    {
      entry: entry.reduce((acc, ent) => {
        const { source, outputName } = ent;
        acc[outputName] = source;
        return acc;
      }, {}),
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
