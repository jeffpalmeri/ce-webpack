# CE-Webpack:

***IMPORTANT***:

We don't require to add any `<script src="/js/main.min.js">` or `<link href="/css/main.min.css" />` anywhere, as we are injecting all required js and css files. The conditions for this to work are:

1. Use `entry` to decide the name of the chunk file and then place that chunk name in the `htmls` or `inlines` map.
2. Make sure to `import` all your scss in that js file, Webpack is smart enough to generate a `.css` file with the exact same name as your chunk file name.

## Install
```bash
yarn add --dev ce-webpack
```

## Webpack initialize files (--init)

### Config file

```js
/* config.js */

const path = require('path');

const htmls = require('./htmls');
const inlines = require('./inlines');

const variantsFolder = path.join(process.cwd(), 'src', 'variants');

/*
 * This requires to be an object with at least 1 entry.
 * It's required to have at least 1 entry as this will later on translate to
 * the actual javascript file that will be injected into your html page.
 * We are using a function to generate this kind of output here:
 * https://github.com/polpenaloza/ce-webpack/blob/master/webpack/htmls.js#L23
 */
const entry = {
  // Plover file names must have at least 2 words joined by a hyphen.
  'inline-js': path.join(variantsFolder, 'inline', 'inline.js'),
  'cool-quiz-1': path.join(variantsFolder, 'quiz', 'cool-quiz-1.js'),
  'cool-quiz-2': path.join(variantsFolder, 'quiz', 'cool-quiz-2.js'),
};

/*
 * The favicon is required, use the path to the favicon.ico
 */
const FAVICON = path.join(process.cwd(), 'img', 'favicon.ico');

/*
 * Optional, but highly needed if we use assets in our project.
 */
const COPY_ARRAY = [];

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', 'fonts'),
  to: path.join(process.cwd(), 'dist', 'fonts'),
});

/*
 * Optional: Overwrite any webpack neeed
 */
const webpackConfig = {} // your custom config here.

module.exports = {
  entry,
  htmls,
  inlines,
  webpackConfig,
  FAVICON,
  COPY_ARRAY,
};

```

### HTMLs file

```js
/* htmls.js */

/**
 * Instruct here the exact path and name for the entry html.
 * If it is a handlebars template (.hbs) there is no need to add the extension,
 * by default it checks for handlebar templates.
 *
 * Optional: Meta Tags:
 * Some projects require flexibility to add specific meta tags. The way you can achieve this is
 * by following this simple pattern:
 * ref: https://github.com/jantimon/html-webpack-plugin#meta-tags
 *
 * This map can contain the following structure:
 * {
 *   [<key>]: {                  // required, this is the path to your html/htm/hbs file.
 *     chunks: ['<chunk-name>'], // required, js name previuosly declared in the entry
 *                               // section and that is required only for this page.
 *
 *     filename: '<file-name>',  // optional, it will figure out the name via the key.
 *     metaTags: {
 *       <tag-value>: { <tag-key>: <tag-value> }
 *     }
 *   }
 * }
 * We are using a function to generate this type of output:
 * https://github.com/polpenaloza/ce-webpack/blob/master/webpack/htmls.js#L23
 */
const htmls = {
  // this will output www.my-domain.com/cool-quiz-1, as by default it will figure the page name via the key
  'src/variants/quiz/cool-quiz-1': {
    chunks: ['cool-quiz-1'],
    metaTags: {
      'X-UA-Compatible': { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    }
  },

  // this will output www.my-domain.com/quiz-2 (whithout html extension)
  'src/variants/quiz/cool-quiz-2.html': { filename: 'quiz-2', chunks: ['cool-quiz-2'] },
}

module.exports = htmls;
```

### Inline file

```js
/* inlines.js */

/**
 * For inline files that have logic embed, we use an array named INLINE.
 * It requires to be an array but it can be empty.
 * Optional: Meta Tags (same as in htmls)
 *
 * The inner maps/objects can contain the following structure:
 * {
 *   filename: 'some-name', // the output name of the file that will be load on the UI via a URL.
 *   chunks: ['ex-inline'], // the js file that was previoulsy declared in the entry section.
 * }
 * We are using a function to generate this type of output:
 * https://github.com/polpenaloza/ce-webpack/blob/master/webpack/inlines.js#L5
 */
const inlines = {
  'inline': {
    filename: 'my-inline-file', chunks: ['inline-js']
  }
},
;

module.exports = inlines;
```

## package.json

*Add the following scripts:*

```json
{
  "scripts": {
    "start": "ce-webpack --env.dev --init webpack/config.js --serve",
    "build:prod": "ce-webpack --env.prod --init webpack/config.js",
    "build:dev": "ce-webpack --env.dev --init webpack/config.js",
  },
}
```

## Required files to create
In your project, you will need to create these files.

NOTE: *if needed, you can extend your rules on each file*

**Babel**
```js
// babel.config
const babelConfig = require('ce-webpack/babel.config');

module.exports = babelConfig;
```

**Eslint**
```js
// .eslintrc.js
const eslintConfig = require('ce-webpack/eslintrc');

module.exports = eslintConfig;
```

**PostCss**
```js
// postcss.config.js
const postcssConfig = require('ce-webpack/postcss.config');

module.exports = postcssConfig;
```

**Prettier**
```js
// .prettierrc.js
const prettierConfig = require('ce-webpack/prettierrc');

module.exports = prettierConfig;
```

**Jest**
```js
// jest.config.js
const jestConfig = require('ce-webpack/jest.config');

module.exports = jestConfig;
```

**StyleLint**
```js
// stylelint.config.js
const styleLintConfig = require('ce-webpack/stylelint.config');

module.exports = styleLintConfig;
```


## Removals

After implementing this library, you will want to remove some `devDependencies` from your project as those are not needed anymore. You can run the following command to get rid of those. If by any chance you don't have that dependency, you can remove it from the command.
```
yarn remove @babel/cli \
@babel/core \
@babel/plugin-proposal-class-properties \
@babel/plugin-proposal-decorators \
@babel/plugin-proposal-export-namespace-from \
@babel/plugin-proposal-function-sent \
@babel/plugin-proposal-json-strings \
@babel/plugin-proposal-numeric-separator \
@babel/plugin-proposal-throw-expressions \
@babel/plugin-syntax-dynamic-import \
@babel/plugin-syntax-import-meta \
@babel/plugin-transform-arrow-functions \
@babel/plugin-transform-runtime \
@babel/preset-env \
@babel/preset-react \
@babel/register \
@babel/runtime \
@testing-library/react \
autoprefixer \
babel-eslint \
babel-loader \
babel-plugin-module-resolver \
babel-plugin-transform-runtime \
babel-register \
clean-webpack-plugin \
compat \
compression-webpack-plugin \
copy-webpack-plugin \
core-js \
css-loader \
custom-event \
enzyme \
enzyme-to-json \
eslint \
eslint-config-airbnb-base \
eslint-config-prettier \
eslint-import-resolver-babel-module \
eslint-loader \
eslint-plugin-babel \
eslint-plugin-compat \
eslint-plugin-import \
eslint-plugin-jquery \
eslint-plugin-prettier \
eslint-plugin-react \
eslint-watch \
exports-loader \
extract-css-chunks-webpack-plugin \
extract-loader \
extract-text-webpack-plugin \
file-loader \
fs \
fs-extra \
gifsicle \
handlebars \
handlebars-loader \
handlebars-webpack-plugin \
happypack \
html-loader \
html-minifier-webpack-plugin \
html-webpack-inline-source-plugin \
html-webpack-plugin \
image-webpack-loader \
imagemin-gifsicle \
imagemin-pngquant \
imagemin-svgo \
imagemin-webpack \
jest \
jest-codemods \
jest-stare \
mini-css-extract-plugin \
mozjpeg \
node-sass \
path \
pngquant \
postcss-loader \
precss \
prettier \
react-hot-loader \
sass-lint \
sass-loader \
sitemap-webpack-plugin \
style-loader \
stylelint \
stylelint-config-prettier \
stylelint-config-recommended \
stylelint-config-recommended-scss \
stylelint-order \
stylelint-prettier \
stylelint-rscss \
stylelint-scss \
uglifyjs-webpack-plugin \
url-loader \
webpack \
webpack-cli \
webpack-dev-server \
webpack-merge \
webpack-visualizer-plugin
```
