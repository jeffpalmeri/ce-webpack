const path = require('path');

const output = {};

const manageInlineOutput = (pages, pathFolder = '') => {
  pages.forEach(({ filename, chunk }) => {
    const key = `${path.join(pathFolder, filename)}`;
    const chunks = [`${chunk || filename}`];
    output[filename] = { filename: key, chunks };
  });
};

const inlines = [{ filename: 'inline', chunk: 'inline-js' }];
manageInlineOutput(inlines);

module.exports = output;
