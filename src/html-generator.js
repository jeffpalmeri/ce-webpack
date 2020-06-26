const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const htmlGenerator = (mapJS, FAVICON) => {
  const INLINE_SCRIPTS = ['runtime'];
  const htmls = Object.entries(mapJS).map(([source, { filename, chunks, inline }]) => {
    const template =
      inline && !source
        ? 'node_modules/ce-webpack/src/inline.ejs'
        : source.indexOf('.') === -1
        ? `${source}.hbs`
        : source;
    const htmlObj = {
      template,
      filename: `./${filename || source.split('/')[source.split('/').length - 1]}`,
      chunks: ['runtime', ...chunks],
      inject: 'body',
      cache: false,
      scriptLoading: 'defer',
    };
    if (FAVICON) {
      htmlObj.favicon = FAVICON;
    }
    if (inline) {
      delete htmlObj.scriptLoading;
      htmlObj.inject = false;
      INLINE_SCRIPTS.push(...chunks);
    }
    return new HtmlWebpackPlugin(htmlObj);
  });
  INLINE_SCRIPTS.length > 1 && htmls.push(new ScriptExtHtmlWebpackPlugin({ inline: INLINE_SCRIPTS }));
  // console.info(JSON.stringify({ htmls, INLINE_SCRIPTS }, null, 2));
  return htmls;
};

module.exports = htmlGenerator;
