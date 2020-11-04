const HtmlWebpackPlugin = require('html-webpack-plugin');
const logger = require('node-color-log');
const yargs = require('yargs');

const htmlGenerator = (mapJS, FAVICON) => {
  const { argv } = yargs;
  const extension = require('./extensions');
  const htmls = Object.entries(mapJS).map(
    ([source, { outputName, chunks, metaTags, templateFile, templateContent }]) => {
      const template = templateFile || (source.indexOf('.') === -1 ? `${source}.hbs` : source);
      const htmlObj = {
        filename: `./${outputName || source.split('/')[source.split('/').length - 1]}${extension}`,
        template,
        chunks: ['runtime', ...chunks],
        inject: 'body',
        cache: false,
        scriptLoading: 'defer',
        favicon: FAVICON,
      };
      if (templateContent) {
        htmlObj.templateContent = templateContent;
      }
      metaTags && (htmlObj.meta = metaTags);
      return new HtmlWebpackPlugin(htmlObj);
    }
  );
  argv.verbose && logger.color('magenta').log(JSON.stringify({ htmls }));
  return htmls;
};

module.exports = htmlGenerator;
