module.exports = {
  root: true,
  extends: 'airbnb-base',
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'max-len': [ 'error', 240 ],
    'no-param-reassign': ['error', { 'props': false }],
    'no-return-assign': 'off',
    'no-unused-expressions': 'off',
  }
}
