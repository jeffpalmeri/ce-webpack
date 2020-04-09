const path = require('path');

const htmls = {
  'test/quiz-1.hbs': { filename: 'quiz-1', chunks: ['quiz'] },
  'test/quiz-2.html': { filename: 'quiz-2', chunks: ['quiz'] },
  'test/quiz-3.html': { filename: 'quiz-3.html', chunks: ['quiz'] },
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
