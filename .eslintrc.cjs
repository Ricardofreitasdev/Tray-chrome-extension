module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true, 
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
      },
    ],
  },
};
