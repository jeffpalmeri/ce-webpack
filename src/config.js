import path from 'path';

const legacyFolder = [process.cwd(), 'src', 'js'];
const variantsFolder = [process.cwd(), 'src', 'variants'];

const entries = {
  main: path.join(...legacyFolder, 'main.js'),
  guidedplan: path.join(...legacyFolder, 'guided-plan.js'),
  plan: path.join(...legacyFolder, 'plan.js'),
  recipes: path.join(...legacyFolder, 'recipes.js'),
  experimenter: path.join(...legacyFolder, 'experimenter.js'),
  contentpage: path.join(...legacyFolder, 'content-page.js'),
  segment: path.join(...legacyFolder, 'segment.js'),
  unlockPromoQuiz: path.join(...legacyFolder, 'unlock-promo-quiz.js'),
  sauceQuiz: path.join(...legacyFolder, 'sauce-quiz.js'),
  pastaQuiz: path.join(...legacyFolder, 'pasta-quiz.js'),
  localplan: path.join(...legacyFolder, 'local-plan-selector.js'),
  rebusPuzzle: path.join(...legacyFolder, 'rebus-main.js'),
};

const FAVICON = path.join(process.cwd(), 'src', 'img', 'favicon.ico');

const PLOVER = [
  {
    template: path.join(...variantsFolder, 'health.htm'),
    filename: './health.html',
    chunks: ['runtime', 'health'],
  },
];

const COPY_ARRAY = [];

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', 'fonts'),
  to: path.join(process.cwd(), 'dist', 'fonts'),
});

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', 'img'),
  to: path.join(process.cwd(), 'dist', 'img'),
});

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', '*.json'),
  to: path.join(process.cwd(), 'dist'),
});

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', '**', '*.xml'),
  to: path.join(process.cwd(), 'dist'),
});

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', 'js', 'data.json'),
  to: path.join(process.cwd(), 'dist', 'js'),
});

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', 'google-amp'),
  to: path.join(process.cwd(), 'dist', 'google-amp'),
});

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', 'extras'),
  to: path.join(process.cwd(), 'dist'),
});

const hbsPartialFolder = [process.cwd(), 'src', 'hbs-partials'];

const hbsPartials = [
  path.join(...hbsPartialFolder, '**', '*.hbs'),
  path.join(...hbsPartialFolder, 'footer', '**', '*.hbs'),
  path.join(...hbsPartialFolder, 'header', '**', '*.hbs'),
  path.join(...hbsPartialFolder, 'hero', '**', '*.hbs'),
  path.join(...hbsPartialFolder, 'menu', '**', '*.hbs'),
  path.join(...hbsPartialFolder, 'meta', '**', '*.hbs'),
  path.join(...hbsPartialFolder, 'quiz', '**', '*.hbs'),
  path.join(...hbsPartialFolder, 'sections', '**', '*.hbs'),
];

const hbs = {
  entry: path.join(...variantsFolder, '**', '*.hbs'),
  output: path.join(process.cwd(), 'dist', '[name].html'),
  partials: hbsPartials,
  getTargetFilepath: function getTargetFilepath(filepath, outputTemplate) {
    const fileName = path.basename(filepath).replace(path.extname(filepath), '');
    const subpath = filepath.split('variants')[1];
    const rmExt = subpath.replace(path.basename(subpath), '');
    const rootPath = path.normalize(outputTemplate.replace('[name]', `${rmExt}${fileName}`));
    return rootPath;
  },
};

export default {
  entries,
  hbs,
  COPY_ARRAY,
  PLOVER,
  FAVICON,
};
