# AMP-Webpack:

***IMPORTANT***:

We don't require to add any `<script src="/js/main.min.js">` or `<link href="/css/main.min.css" />` anywhere, as we are injecting all required js and css files. The conditions for this to work are:

1. Use `entry` to decide the name of the chunk file and then place that chunk name in the `htmls` map.
2. Make sure to `import` all your scss in that js file, Webpack is smart enough to generate a `.scss` file with the exact same name as your chunk file name.


## Install
```bash
yarn add --dev amp-webpack
````



## Webpack initialize file (--init)
```js
/* config.js */
import path from 'path';

const variantsFolder = [process.cwd(), 'src', 'variants'];

const entry = {
  plover: path.join(...variantsFolder, 'splits', 'plover.js'),
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
 */
const PLOVER = {
  'test/splits/plover': { filename: 'plover', chunks: ['plover'], inline: true },
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
  PLOVER,
  COPY_ARRAY,
};
```


## package.json

*Add the following scripts:*

```json
{
  "scripts": {
    "start": "amp-webpack --env.dev --init webpack/config.js",
    "build:prod": "amp-webpack --env.prod --init webpack/config.js",
    "build:dev": "amp-webpack --env.qa --init webpack/config.js",
  },
}
```
***NOTE:*** it's important to 

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
autoprefixer \
babel-loader \
babel-plugin-module-resolver \
babel-plugin-transform-runtime \
babel-register \
clean-webpack-plugin \
compression-webpack-plugin \
copy-webpack-plugin \
core-js \
css-loader \
custom-event \
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
mozjpeg \
node-sass \
path \
pngquant \
postcss-loader \
precss \
react-hot-loader \
sass-loader \
sitemap-webpack-plugin \
style-loader \
uglifyjs-webpack-plugin \
url-loader \
webpack \
webpack-cli \
webpack-dev-server \
webpack-merge \
webpack-visualizer-plugin
```
