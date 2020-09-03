const path = require('path');

const htmls = require('./htmls');
const inlines = require('./inlines');

const testFolder = path.join(process.cwd(), 'test');

const entry = {};

const manageEntries = (pages, variantsPath) => {
  pages.forEach(({ source, outputName }) => {
    const value = path.join(variantsPath, `${source}.js`);
    entry[outputName || source] = value;
  });
};

const quizPages = [{ source: 'quiz' }];
manageEntries(quizPages, path.join(testFolder, 'quiz'));

const inlineJsFiles = [{ source: 'index', outputName: 'inline-js' }];
manageEntries(inlineJsFiles, path.join(testFolder, 'inline'));

const FAVICON = path.join(process.cwd(), 'img', 'favicon.ico');

const COPY_ARRAY = [];

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'img'),
  to: path.join(process.cwd(), 'dist', 'img'),
});

module.exports = {
  entry,
  htmls,
  inlines,
  COPY_ARRAY,
  FAVICON,
};
