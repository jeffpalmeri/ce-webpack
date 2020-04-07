import HtmlWebpackPlugin from 'html-webpack-plugin';

const htmlMinifyConfig = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

const mapJs = {
  index: ['main'],
};

export default Object.entries(mapJs).map(
  ([filename, chunks]) =>
    new HtmlWebpackPlugin({
      template: `src/${filename}.html`,
      filename,
      chunks: [...chunks, 'runtime'],
      minify: htmlMinifyConfig,
    })
);
