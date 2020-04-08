const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const htmlMinifyConfig = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

const generatePage = (template) => fs.readFileSync(template, { encoding: 'utf-8' });

const htmlGenerator = (mapJS) =>
  Object.entries(mapJS).map(
    ([source, { filename, chunks }]) =>
      new HtmlWebpackPlugin({
        templateContent: generatePage(`${source}.html`),
        filename,
        chunks: [...chunks, 'runtime'],
        minify: htmlMinifyConfig,
      })
  );

module.exports = htmlGenerator;
