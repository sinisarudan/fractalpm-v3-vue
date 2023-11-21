module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:vue/vue3-essential', // essential vue rules that should not be turned off
    'plugin:vue/vue3-recommended' // advanced, but still vue recommended rules
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue', // https://eslint.vuejs.org/
    'jsdoc'
  ],
  rules: {
    semi: ['error', 'always'], // `;` is required (at the end of command/line, etc)
    'jsdoc/no-undefined-types': 1 // to avoid rising error on imports that are not used except for `JSDoc` typing
  }
};
