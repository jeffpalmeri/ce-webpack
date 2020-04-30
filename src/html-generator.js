const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlGenerator = (mapJS, FAVICON) => {
  return Object.entries(mapJS).map(([source, { filename, chunks, inline }]) => {
    const htmlObj = {
      template: source.indexOf('.') === -1 ? `${source}.hbs` : source,
      filename: `./${filename || source.split('/')[source.split('/').length - 1]}`,
      chunks: ['runtime', ...chunks],
      inject: 'body',
      scriptLoading: 'defer',
    };
    if (FAVICON) {
      htmlObj.favicon = FAVICON;
    }
    if (inline) {
      delete htmlObj.scriptLoading;
      htmlObj.inlineSource = '.(js|css)$';
    }
    // console.log(JSON.stringify({ htmlObj }, null, 2));
    return new HtmlWebpackPlugin(htmlObj);
  });
};

module.exports = htmlGenerator;
