const path = require('path');

const htmls = {
  'test/quiz/quiz-1.hbs': { filename: 'quiz/quiz-1', chunks: ['quiz'] },
  'test/quiz/quiz-2.html': { filename: 'quiz-2', chunks: ['quiz'] },
  'test/quiz/quiz-3.html': { filename: 'quiz-3.html', chunks: ['quiz'] },
};

const META_TAGS = {
  'X-UA-Compatible': { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  'Content-Type': { 'http-equiv': 'Content-Type', content: 'text/html;charset=UTF-8' },
  charset: { charset: 'UTF-8' },
  viewport: {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
  },
};

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
  META_TAGS,
};
