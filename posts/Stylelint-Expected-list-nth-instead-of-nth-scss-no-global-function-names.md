---
title: 'Stylelint: Expected list.nth instead of nth (scss/no-global-function-names)'
tags:
- CSS
- Sass
- stylelint
categories:
- 前端工程化
abbrlink: 6bc1ccb8
date: 2023-04-18 16:51:23
---

vue3 + vite 项目中，使用 `Stylelint` 检查和格式化 **css、less、scss** 代码格式，遇到这个报错：`Stylelint: Expected list.nth instead of nth (scss/no-global-function-names)`。

![Sass & Stylelint](https://tiven.cn/static/img/img-sass-01-GS5LQHZQxfhJcSbG2NjuY.jpg)

<!-- more -->

## 代码展示

```scss
$colors: #66b1ff, #84ce62, #ebb563, #f78a89, #b799ff, #f99b7d, #afdafe, #b7e7e1, #efedd4;

@for $i from 1 through length($colors) {
  .annotator-hl-#{$i} {
    background: nth($colors, $i);
    cursor: pointer;
  }
}
```

## 问题原因

在这个 `@for` 循环中使用了 `sass` 内置的 `nth` 函数，被 `Stylelint` 工具检查报错。

## 解决办法

有两种方法能使 `Stylelint` 不标红报错。

1. 在 `.stylelintrc` 配置文件中配置忽略规则

```js
module.exports = {
  rules: {
    'scss/no-global-function-names': null // 添加这一行
  }
}
```

2. 在自己的 `scss` 文件中加载使用 `list` 模块，以 `list.nth` 的形式使用 **nth** 函数。(**推荐**)

```scss
@use "sass:list"; /* 重点 */

$colors: #66b1ff, #84ce62, #ebb563, #f78a89, #b799ff, #f99b7d, #afdafe, #b7e7e1, #efedd4;

@for $i from 1 through length($colors) {
  .annotator-hl-#{$i} {
    background: list.nth($colors, $i); /* 重点 */
    cursor: pointer;
  }
}
```

* 参考文档：https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md


---

欢迎访问：[天问博客](https://tiven.cn/p/6bc1ccb8/ "天问博客-专注于大前端技术")

