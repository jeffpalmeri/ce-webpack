const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlGenerator = (mapJS) => {
  return Object.entries(mapJS).map(
    ([source, { filename, chunks }]) =>
      new HtmlWebpackPlugin({
        template: source,
        filename,
        chunks: ['runtime', 'vendors', ...chunks],
        scriptLoading: 'defer',
      })
  );
};

module.exports = htmlGenerator;
