module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    'brace-style': 'off',
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-extraneous-dependencies': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/prop-types': 'warn',
    'no-shadow': 'warn',
    'react/function-component-definition': 'off',
    'react/jsx-one-expression-per-line': 'off',
  },
};
