const path = require('path');

const output = {};

const manageOutput = (pages, pathFolder = '') => {
  pages.forEach(({ filename, chunk }) => {
    const key = `${path.join(pathFolder, filename)}`;
    const chunks = [`${chunk || filename}`];
    output[filename] = { filename: key, chunks };
  });
};

const inlines = [{ filename: 'inline', chunk: 'inline-js' }];
manageOutput(inlines);

module.exports = output;
