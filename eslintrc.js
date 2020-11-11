// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'prettier/react',
    'plugin:react/recommended',
    'plugin:import/react',
    'plugin:jsx-a11y/recommended',
  ],

  plugins: ['prettier', 'jsx-a11y'],

  globals: {
    __DEV__: true,
    ampt: true,
    atrack: true,
    fbq: true,
    ga: false,
    gtag: true,
    location: true,
    safariAmpt: true,
    document: true,
    window: true,
  },

  env: {
    browser: false,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  rules: {
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'import/prefer-default-export': [0, { packageDir: '.' }],
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [2, { packageDir: '.' }],
    'import/no-dynamic-require': 'off',
    'import/named': 0,
    'max-len': [2, { code: 120 }],
    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      2,
      {
        allow: ['error', 'info', 'warn'],
      },
    ],
    'no-debugger': 2,
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],

    // // Allow only special identifiers
    // // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': 'off',

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': 2,

    // react specific rules
    'react/forbid-prop-types': 'off',
    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],

    // Functional and class components are equivalent from React's point of view
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/destructuring-assignment': 'off',
    'react/prefer-stateless-function': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': 'off',

    // Accessibility rules
    'jsx-a11y/alt-text': 2,
  },

  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', './src/'],
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
