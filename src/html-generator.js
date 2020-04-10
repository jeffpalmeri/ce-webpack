const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlGenerator = (mapJS) => {
  return Object.entries(mapJS).map(
    ([source, { filename, chunks }]) =>
      new HtmlWebpackPlugin({
        template: source.indexOf('.') === -1 ? `${source}.hbs` : source,
        filename: `./${filename || source.split('/')[source.split('/').length - 1]}`,
        chunks: ['runtime', 'vendors', ...chunks],
        scriptLoading: 'defer',
      })
  );
};

module.exports = htmlGenerator;
