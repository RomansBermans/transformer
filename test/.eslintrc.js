module.exports = {
  root: true,
  env: {
    mocha: true,
  },
  extends: 'airbnb-base',
  rules: {
    'max-len': [ 'error', 240 ],
    'no-sparse-arrays': 'off',
    'no-template-curly-in-string': 'off',
    'object-curly-newline': 'off',
  }
}
