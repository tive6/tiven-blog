---
title: 'vue3+vite报错Uncaught ReferenceError: exports is not defined'
tags:
- Vue
- Vite
- Router
categories:
- Vite
abbrlink: 71e7d100
date: 2023-05-05 14:16:39
---

使用vue3 + vite + vue-router搭建项目，在运行时，页面控制台出现报错：`Uncaught ReferenceError: exports is not defined`，报错的来源显示 `vue-router.esm-bundler.js:2306`。

![vue3 + vite + vue-router](https://tiven.cn/static/img/img-router-01-JeCRj_iQtGO4jfFUoctpg.jpg)

<!-- more -->

## 项目依赖

* package.json

```json
{
  "name": "vue3-demo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "git": "tive git -c tive.git.config.cjs",
    "lint": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./src",
    "lint:stylelint": "stylelint --cache --fix \"src/**/*.{less,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
    "prepare": "husky install"
  },
  "dependencies": {
    "amfe-flexible": "^2.2.1",
    "axios": "^1.4.0",
    "lib-flexible": "^0.3.2",
    "pinia": "^2.0.35",
    "vant": "^4.3.1",
    "vue": "^3.2.47",
    "vue-router": "4"
  },
  "devDependencies": {
    "@types/node": "^20.1.0",
    "@typescript-eslint/eslint-plugin": "^5.59.2",
    "@typescript-eslint/parser": "^5.59.2",
    "@vitejs/plugin-vue": "^4.1.0",
    "eslint": "^8.40.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-config-standard": "^17.0.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-promise": "^6.1.1",
    "eslint-plugin-unused-imports": "latest",
    "eslint-plugin-vue": "^9.11.1",
    "husky": "^8.0.3",
    "lint-staged": "^13.1.2",
    "postcss": "^8.4.23",
    "postcss-html": "^1.5.0",
    "postcss-pxtorem": "^6.0.0",
    "prettier": "^2.8.8",
    "prettier-eslint": "^15.0.1",
    "sass": "^1.58.3",
    "stylelint": "^15.2.0",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-prettier": "^9.0.3",
    "stylelint-config-recess-order": "^4.0.0",
    "stylelint-config-recommended-scss": "^11.0.0",
    "stylelint-config-recommended-vue": "^1.4.0",
    "stylelint-config-standard": "^24.0.0",
    "stylelint-config-standard-scss": "^3.0.0",
    "stylelint-order": "^5.0.0",
    "stylelint-prettier": "^3.0.0",
    "stylelint-scss": "^4.1.0",
    "typescript": "^5.0.2",
    "unplugin-vue-components": "^0.24.1",
    "vite": "^4.3.2",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-style-import": "^2.0.0",
    "vue-eslint-parser": "^9.2.1",
    "vue-tsc": "^1.4.2"
  },
  "lint-staged": {
    "*.{js,jsx,tsx,ts}": [
      "npm run lint",
      "npm run lint:stylelint"
    ]
  }
}
```

## 问题解决

升级 **vue-router** 的版本到 `4.0.1`

```shell
pnpm add -D vue-router@4.0.1
```

参考文档：https://github.com/vuejs/vue-router/issues/3404

---

欢迎访问：[天问博客](https://tiven.cn/p/71e7d100/ "天问博客-专注于大前端技术")
