const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const fs = require('fs');
const path = require('path');

const htmlGenerator = (inlineArr, FAVICON) => {
  const INLINE_SCRIPTS = ['runtime'];
  let defaultSource = path.join('node_modules', 'ce-webpack', 'src', 'inline.ejs');
  if (!fs.existsSync(defaultSource)) {
    defaultSource = path.join('src', 'inline.ejs');
  }
  const inlines = inlineArr.map(({ filename, chunks, source }, entry) => {
    if (!filename || typeof filename !== 'string') {
      throw Error(`Filename is invalid for entry number ${entry}. It should be a string value`);
    }
    if (!chunks || !Array.isArray(chunks) || !chunks.length) {
      throw Error(`Chunks is invalid for entry number ${entry} - ${filename}. It should be an array.`);
    }
    const template = !source ? defaultSource : source.indexOf('.') === -1 ? `${source}.hbs` : source;
    const htmlObj = {
      template,
      filename: `./${filename || source.split('/')[source.split('/').length - 1]}`,
      chunks: ['runtime', ...chunks],
      inject: false,
      cache: false,
      favicon: FAVICON,
    };
    INLINE_SCRIPTS.push(...chunks);
    return new HtmlWebpackPlugin(htmlObj);
  });
  inlines.push(new ScriptExtHtmlWebpackPlugin({ inline: INLINE_SCRIPTS }));
  // console.info(JSON.stringify({ htmls, INLINE_SCRIPTS }, null, 2));
  return inlines;
};

module.exports = htmlGenerator;
