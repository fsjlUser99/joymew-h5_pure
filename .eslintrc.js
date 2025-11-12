module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'import/no-cycle': 'off',
    'global-require': 'off',
    'arrow-body-style': 'off',
    'max-len': 'off',
    // 关闭倾向于默认导出
    'import/prefer-default-export': 'off',
    // vue中空标签总是自闭合
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ],
    'no-plusplus': 'off',
    'camelcase': 'off',
    'no-underscore-dangle': 'off',
    'linebreak-style': 'off'
  },
  globals: {
    _hmt: true,
  },
};
