const path = require('path');
const yargs = require('yargs');

const { env } = yargs.argv;

const variantsPath = path.join(process.cwd(), 'test', 'quiz');
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
    content: `https://${env.domain || 'help'}.hubblecontacts.com/pages/images/quiz/quiz-img1.jpg`,
  },
};

const output = {};

const manageOutput = (pages, pagePath = '') => {
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

const htmls = [
  { source: 'quiz-1', chunk: 'quiz' },
  { source: 'quiz-2', chunk: 'quiz', filename: 'quiz-2.html' },
  { source: 'quiz-3', chunk: 'quiz', filename: 'quiz/quiz-3.htm' },
];
manageOutput(htmls);

module.exports = output;
