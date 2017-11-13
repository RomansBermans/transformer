module.exports = {
  root: true,
  env: {
    mocha: true,
  },
  extends: 'airbnb-base',
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'max-len': [ 'error', 240 ],
    'no-param-reassign': ['error', { 'props': false }],
    'no-return-assign': 'off',
    'no-sparse-arrays': 'off',
    'no-template-curly-in-string': 'off',
    'object-curly-newline': 'off',
  }
}
