const path = require('path');

const bulks = require('./bulks');
const htmls = require('./htmls');
const inlines = require('./inlines');

const testFolder = path.join(process.cwd(), 'variants');

const entry = {};

const manageEntries = (pages, variantsPath) => {
  pages.forEach(({ source, outputName }) => {
    const value = path.join(variantsPath, `${source}.js`);
    entry[outputName || source] = value;
  });
};

const bulkPages = [{ source: 'index', outputName: 'bulk-test' }];
manageEntries(bulkPages, path.join(testFolder, 'bulks'));

const quizPages = [
  { source: path.join('q-1', 'index'), outputName: 'quiz-1' },
  { source: path.join('q-2', 'index'), outputName: 'quiz-2' },
  { source: path.join('q-3', 'index'), outputName: 'quiz-3' },
];
manageEntries(quizPages, path.join(testFolder, 'quiz'));

const inlineJsFiles = [{ source: 'index', outputName: 'inline-js' }];
manageEntries(inlineJsFiles, path.join(testFolder, 'inline'));

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
