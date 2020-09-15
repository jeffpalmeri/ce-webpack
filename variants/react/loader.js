import React from 'react';
import ReactDOM from 'react-dom';

const initApp = (App, id) => {
  function run() {
    ReactDOM.render(React.createElement(App), document.getElementById(id));
  }

  const loadedStates = ['complete', 'loaded', 'interactive'];

  if (loadedStates.includes(document.readyState) && document.body) {
    run();
  } else {
    window.addEventListener('DOMContentLoaded', run, false);
  }

  if (module.hot) {
    module.hot.accept();
  }
};

export default initApp;
