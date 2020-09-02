const HtmlWebpackPlugin = require('html-webpack-plugin');
const yargs = require('yargs');

const extension = require('./extensions');

const htmlGenerator = (mapJS, FAVICON, META_TAGS) => {
  const { argv } = yargs;
  const htmls = Object.entries(mapJS).map(([source, { filename, chunks }]) => {
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
    META_TAGS && (htmlObj.meta = META_TAGS);
    return new HtmlWebpackPlugin(htmlObj);
  });
  argv.verbose && console.info(JSON.stringify({ htmls }, null, 2));
  return htmls;
};

module.exports = htmlGenerator;
