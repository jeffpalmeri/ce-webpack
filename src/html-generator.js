import HtmlWebpackPlugin from 'html-webpack-plugin';

const htmlMinifyConfig = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

const htmlGenerator = (mapJS) =>
  Object.entries(mapJS).map(
    ([filename, chunks]) =>
      new HtmlWebpackPlugin({
        template: `src/${filename}.html`,
        filename,
        chunks: [...chunks, 'runtime'],
        minify: htmlMinifyConfig,
      })
  );

export default htmlGenerator;
