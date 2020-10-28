import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import logger from 'node-color-log';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

import extension from './extensions';

const inlineGenerator = (mapJS, FAVICON) => {
  const INLINE_SCRIPTS = ['runtime'];
  const { argv } = yargs;
  let defaultSource = path.join('node_modules', 'ce-webpack', 'src', 'inline.ejs');
  if (!fs.existsSync(defaultSource)) {
    defaultSource = path.join('src', 'inline.ejs');
  }
  const inlines = Object.entries(mapJS).map(([entry, { filename, chunks, metaTags, source }]) => {
    if (!filename || typeof filename !== 'string') {
      throw Error(`Filename is invalid for entry number ${entry}. It should be a string value`);
    }
    if (!chunks || !Array.isArray(chunks) || !chunks.length) {
      throw Error(`Chunks is invalid for entry number ${entry} - ${filename}. It should be an array.`);
    }
    const template = !source ? defaultSource : source.indexOf('.') === -1 ? `${source}.hbs` : source;
    const htmlObj = {
      template,
      filename: `./${filename}${extension}`,
      chunks: ['runtime', ...chunks],
      inject: false,
      cache: false,
      favicon: FAVICON,
    };
    metaTags && (htmlObj.meta = metaTags);
    INLINE_SCRIPTS.push(...chunks);
    return new HtmlWebpackPlugin(htmlObj);
  });
  inlines.push(new ScriptExtHtmlWebpackPlugin({ inline: INLINE_SCRIPTS }));
  argv.verbose && logger.color('cyan').log(JSON.stringify({ inlines }));
  return inlines;
};

export default inlineGenerator;
