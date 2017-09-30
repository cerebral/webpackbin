module.exports = {
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
  plugins: ['react', 'prettier'],
  extends: ['plugin:react/recommended', 'prettier', 'prettier/react'],
  rules: {
    'prettier/prettier': ['error', { trailingComma: 'es5', singleQuote: true }],
    'react/prop-types': 0
  },
};
