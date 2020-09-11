const HtmlWebpackPlugin = require('html-webpack-plugin');
const logger = require('node-color-log');
const yargs = require('yargs');

const extension = require('./extensions');

const htmlGenerator = (mapJS, FAVICON) => {
  const { argv } = yargs;
  const htmls = Object.entries(mapJS).map(([source, { filename, chunks, metaTags }]) => {
    const template = source.indexOf('.') === -1 ? `${source}.hbs` : source;
    const htmlObj = {
      template,
      filename: `./${filename || source.split('/')[source.split('/').length - 1]}${extension}`,
      chunks: ['runtime', ...chunks],
      inject: 'body',
      cache: false,
      scriptLoading: 'defer',
      favicon: FAVICON,
    };
    metaTags && (htmlObj.meta = metaTags);
    return new HtmlWebpackPlugin(htmlObj);
  });
  argv.verbose && logger.color('magenta').log(JSON.stringify({ htmls }));
  return htmls;
};

module.exports = htmlGenerator;
