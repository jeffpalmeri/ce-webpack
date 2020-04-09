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

const PLOVER = [
  {
    template: path.join(...variantsFolder, 'splits', 'plover.html'),
    filename: './plover',
    chunks: ['plover'],
  },
];

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