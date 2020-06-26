const path = require('path');

const htmls = {
  'test/quiz/quiz-1.hbs': { filename: 'quiz/quiz-1', chunks: ['quiz'] },
  'test/quiz/quiz-2.html': { filename: 'quiz-2', chunks: ['quiz'] },
  'test/quiz/quiz-3.html': { filename: 'quiz-3.html', chunks: ['quiz'] },
};

const testFolder = [process.cwd(), 'test'];

const entry = {
  quiz: path.join(...testFolder, 'quiz', 'quiz.js'),
  'inline-js': path.join(...testFolder, 'inline', 'index.js'),
};

const FAVICON = path.join(process.cwd(), 'img', 'favicon.ico');

const INLINE = {
  'src/inline.ejs': { filename: 'inline', chunks: ['inline-js'], inline: true },
};

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
