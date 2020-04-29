# CE-Webpack:

***IMPORTANT***:

We don't require to add any `<script src="/js/main.min.js">` or `<link href="/css/main.min.css" />` anywhere, as we are injecting all required js and css files. The conditions for this to work are:

1. Use `entry` to decide the name of the chunk file and then place that chunk name in the `htmls` map.
2. Make sure to `import` all your scss in that js file, Webpack is smart enough to generate a `.scss` file with the exact same name as your chunk file name.


## Install
```bash
yarn add --dev ce-webpack
````



## Webpack initialize file (--init)
```js
/* config.js */
import path from 'path';

const variantsFolder = [process.cwd(), 'src', 'variants'];

const entry = {
  'inline-js': path.join(...variantsFolder, 'inline', 'inline.js'),
  'cool-quiz-1': path.join(...variantsFolder, 'quiz', 'cool-quiz-1.js'),
  'cool-quiz-2': path.join(...variantsFolder, 'quiz', 'cool-quiz-2.js'),
};

/**
 * Instruct here the exact path and name for the entry html.
 * If it is a handlebars template (.hbs) there is no need to add the extension,
 * by default it checks for handlebar templates.
 * This map can contain the following structure:
 * {
 *   [<key>]: {                  // required, this is the path to your html/htm/hbs file.
 *     filename: '<file-name>',  // optional, will figure out the name via the key.
 *     chunks: ['<chunk-name>'], // required, js name that is required for this page.
 *   }
 * }
 */
const htmls = {
  // this will output www.domain.com/cool-quiz-1
  'src/variants/quiz/cool-quiz-1': { chunks: ['cool-quiz-1'] },
  // this will output www.domain.com/quiz-2 (whithout html extension)
  'src/variants/quiz/cool-quiz-2.html': { filename: 'quiz-2', chunks: ['cool-quiz-2'] },
}

const FAVICON = path.join(process.cwd(), 'src', 'img', 'favicon.ico');

/**
 * Same structure as htmls, with the notation that inline must be set to `true`
 * NOTE: by default, if you don't include a key for the template to locate, it will
 * assing a default one from this repo: inline.hbs
 */
const INLINE = {
  'test/inline/inline': { filename: 'my-inline-file', chunks: ['inline-js'], inline: true },
  '': { filename: 'my-inline-file-2', chunks: ['inline-js'], inline: true },
};

const COPY_ARRAY = [];

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', 'fonts'),
  to: path.join(process.cwd(), 'dist', 'fonts'),
});

module.exports = {
  entry,
  htmls,
  FAVICON,
  INLINE,
  COPY_ARRAY,
};
```
***WARNING***:
Do not update/upgrade `html-webpack-plugin`, as it will stop INLINE functionality from happening.


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
In your project, you will need to create 2 files and instruct them to extend the config set here:

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

NOTE: *if needed, you can extend your rules on each file*


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
