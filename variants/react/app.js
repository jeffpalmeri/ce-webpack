import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/stable';

import React from 'react';

import Loader from './loader';

/* eslint-disable */
const App = (Component, props = {}) => () => (
  <React.Suspense fallback={<Loader />}>
    <Component {...props} />
  </React.Suspense>
);

export default App;
