module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    // 'plugin:@next/next/recommended',
    // 'prettier',
  ],
  plugins: ['unused-imports', 'simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
}
