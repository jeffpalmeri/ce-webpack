import HtmlWebpackPlugin from 'html-webpack-plugin';
import logger from 'node-color-log';
import yargs from 'yargs';

import extension from './extensions';

const htmlGenerator = (mapJS, FAVICON) => {
  const { argv } = yargs;
  const htmls = Object.entries(mapJS).map(([source, { filename, chunks, metaTags, templateFile, templateContent }]) => {
    const template = templateFile || (source.indexOf('.') === -1 ? `${source}.hbs` : source);
    const htmlObj = {
      filename: `./${filename || source.split('/')[source.split('/').length - 1]}${extension}`,
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
  });
  argv.verbose && logger.color('magenta').log(JSON.stringify({ htmls }));
  return htmls;
};

export default htmlGenerator;
