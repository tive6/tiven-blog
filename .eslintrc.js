module.exports = {
  extends: [
    'next/core-web-vitals',
    // 'plugin:@next/next/recommended',
    // 'prettier',
  ],
  env: {
    es6: true,
    node: true,
  },
  plugins: ['unused-imports', 'simple-import-sort', 'prettier'], //这个是为了整合我们自己配置.prettierrc.js
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
