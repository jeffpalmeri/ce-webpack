const path = require('path');

const htmls = require('./htmls');

const testFolder = [process.cwd(), 'test'];

const entry = {
  quiz: path.join(...testFolder, 'quiz', 'quiz.js'),
  'inline-js': path.join(...testFolder, 'inline', 'index.js'),
};

const FAVICON = path.join(process.cwd(), 'img', 'favicon.ico');

const INLINE = [{ filename: 'inline', chunks: ['inline-js'] }];

const COPY_ARRAY = [];

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'img'),
  to: path.join(process.cwd(), 'dist', 'img'),
});

module.exports = {
  entry,
  htmls,
  COPY_ARRAY,
  INLINE,
  FAVICON,
};
