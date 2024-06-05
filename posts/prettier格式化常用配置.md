---
title: prettier格式化常用配置
tags:
- npm
- 规范
- 工具
categories:
- 前端工程化
abbrlink: ae7552dc
date: 2022-05-24 17:47:48
---

各行各业都有一定的准则和规范，搞技术写代码也是一样，统一的规范对于团队开发协作不可或缺。随着前端应用的大型化和复杂化，越来越多的前端团队对代码规范越来越重视。**Prettier** 是一个代码格式化工具，可以格式化代码，结合 **ESLint** 使用，可以提高代码质量。

![Prettier Format](https://tiven.cn/static/img/img-prettier-01-Q-OCvzo_pli_rTirePYWv.jpg)

<!-- more -->

## Prettier 常用配置

```js
// prettier.config.js

module.exports = {
    printWidth: 80, // 80 每行代码长度
    tabWidth: 2, // 2 每个 tab 相当于多少个空格
    useTabs: true, // false 是否使用 tab 进行缩进
    singleQuote: true, // false 使用单引号
    semi: false, // true 声明结尾使用分号
    trailingComma: 'es5', // none 多行抵用拖尾逗号
    bracketSpacing: true, // true 对象字面量的大括号间使用空格
    jsxSingleQuote: false,
    jsxBracketSameLine: false, // false 多行 jsx 中的 > 放在最后一行，而不是另起一行
    arrowParens: 'avoid', // avoid 只有一个参数是否带圆括号
    vueIndentScriptAndStyle: true, // vue文件的script标签和Style标签下的内容需要缩进
    singleAttributePerLine: false, // 在 HTML、Vue 和 JSX 中每行强制执行单个属性
    embeddedLanguageFormatting: 'auto', // 控制 Prettier 是否格式化文件中嵌入的引用代码
}
```

持续更新ing ...

---

欢迎访问：[天问博客](https://tiven.cn/p/ae7552dc/ "天问博客-专注于大前端技术")



