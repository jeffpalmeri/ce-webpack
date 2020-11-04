const path = require('path');

const bulks = require('./bulks.babel');
const htmls = require('./htmls.babel');
const inlines = require('./inlines.babel');

const testFolder = path.join(process.cwd(), 'variants');

const bulkPages = [{ source: path.join(testFolder, 'bulks', 'index'), outputName: 'bulk-test' }];
const quizPages = [
  { source: path.join(testFolder, 'quiz', 'q-1', 'index'), outputName: 'quiz-1' },
  { source: path.join(testFolder, 'quiz', 'q-2', 'index'), outputName: 'quiz-2' },
  { source: path.join(testFolder, 'quiz', 'q-3', 'index'), outputName: 'quiz-3' },
];
const inlineJsFiles = [{ source: path.join(testFolder, 'inline', 'index'), outputName: 'inline-js' }];

const entry = [...bulkPages, ...quizPages, ...inlineJsFiles];

const FAVICON = path.join(process.cwd(), 'assets', 'images', 'favicon.ico');

const COPY_ARRAY = [];

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'assets', 'images'),
  to: path.join(process.cwd(), 'dist'),
});

module.exports = {
  entry,
  bulks,
  htmls,
  inlines,
  COPY_ARRAY,
  FAVICON,
};
