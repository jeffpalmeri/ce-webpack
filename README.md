# Configs:

**Install**
````bash
yarn add @polpenaloza/amp-webpack --dev
````
**package.json**

*This needs to be setup on each project*

````json wrap
{
  "scripts": {
    "build:dev": "webpack --mode development --config node_modules/@amp/webpack/dev.babel.js --hide-modules",
    "build:prod": "webpack --mode production --config node_modules/@amp/webpack/prod.babel.js --hide-modules",
    "start": "webpack-dev-server --progress --config webpack/dev.babel.js --env.dev --hide-modules --colors",
  },
}
````


## Options for builds
````js
import path from 'path';

const variantsFolder = [process.cwd(), 'src', 'variants'];

const entry = {
  main: path.join(...variantsFolder, 'main.js'),
  plover: path.join(...variantsFolder, 'plover.js'),
  'cool-quiz-1': path.join(...variantsFolder, 'cool-quiz-1.js'),
};

const htmls = {
  'cool-quiz-1': ['cool-quiz-1', 'main'],
}

const FAVICON = path.join(process.cwd(), 'app', 'img', 'favicon.ico');

const PLOVER = [
  {
    template: path.join(...variantsFolder, 'plover.html'),
    filename: './plover.html',
    chunks: ['runtime', 'plover'],
  },
];

const COPY_ARRAY = [];

COPY_ARRAY.push({
  from: path.join(process.cwd(), 'src', 'fonts'),
  to: path.join(process.cwd(), 'dist', 'fonts'),
});

const AMP_CONFIG = {
  entry,
  htmls,
  FAVICON,
  PLOVER,
  COPY_ARRAY,
};

process.AMP_CONFIG = AMP_CONFIG;
````
