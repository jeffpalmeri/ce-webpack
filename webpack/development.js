const path = require('path');

const htmls = {
  'test/quiz.hbs': { filename: 'quiz', chunks: ['quiz'] },
};

const testFolder = [process.cwd(), 'test'];

const entry = {
  quiz: path.join(...testFolder, 'quiz.js'),
};

const FAVICON = path.join(process.cwd(), 'img', 'favicon.ico');

const PLOVER = [];

const COPY_ARRAY = [];

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'img'),
  to: path.join(process.cwd(), 'dist', 'img'),
});

module.exports = {
  entry,
  htmls,
  COPY_ARRAY,
  PLOVER,
  FAVICON,
};
