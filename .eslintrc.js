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
  plugins: ['prettier'], //这个是为了整合我们自己配置.prettierrc.js
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
      },
    ],
  },
}
