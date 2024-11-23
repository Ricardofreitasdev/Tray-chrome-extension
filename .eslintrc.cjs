module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true,
  },
  parserOptions: {
    ecmaVersion: 2023,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/multi-word-component-names': 'off',
    indent: ['error', 2],
    'max-len': ['error', { code: 80, tabWidth: 2, ignoreUrls: true }],
    'prettier/prettier': ['error', { printWidth: 80 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
      },
    ],
  },
};
