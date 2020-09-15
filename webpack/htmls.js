const path = require('path');
const yargs = require('yargs');

const { env } = yargs.argv;

const variantsPath = path.join(process.cwd(), 'variants', 'quiz');
const META_TAGS = {
  'X-UA-Compatible': { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  'Content-Type': { 'http-equiv': 'Content-Type', content: 'text/html;charset=UTF-8' },
  charset: { charset: 'UTF-8' },
  viewport: {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
  },
  'og:image': {
    property: 'og:image',
    content: `https://${env.domain || 'help'}.domain.com/assets/images/quiz/quiz-img-1.jpg`,
  },
};

const output = {};

const manageHtmlOutput = (pages, pagePath = '') => {
  pages.forEach(({ source, filename, chunk }) => {
    const key = path.join(variantsPath, pagePath, `${source}.hbs`);
    const value = {
      filename: filename || source,
      chunks: [chunk || source],
      metaTags: META_TAGS,
    };
    output[key] = value;
  });
};

const pages = [
  { source: path.join('q-1', 'quiz-1'), chunk: 'quiz-1', filename: 'quiz-1' },
  { source: path.join('q-2', 'quiz-2'), chunk: 'quiz-2', filename: 'quiz-2.html' },
  { source: path.join('q-3', 'quiz-3'), chunk: 'quiz-3', filename: 'quiz/quiz-3.htm' },
];
manageHtmlOutput(pages);

module.exports = output;
