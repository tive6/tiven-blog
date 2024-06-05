---
title: 深入浅出：white-space 和 word-break 的作用
tags:
  - CSS3
  - HTML5
categories:
  - CSS3
abbrlink: 5ee54580
date: 2024-01-20 11:30:31
---

在前端开发中，排版和文本处理是不可忽视的一部分，而CSS属性中的 `white-space` 和 `word-break` 就是在处理文本时非常重要的两个属性。它们分别用于控制空白和单词的处理方式，对于实现良好的文本显示和排版效果至关重要。

![CSS3](https://tiven.cn/static/img/css-01-fDhKkCf2.jpg)

[//]: # (<!-- more -->)

## 一、white-space 属性

`white-space` 属性用于定义如何处理元素内的空白。

* 语法：

```css
/* 单个关键字值 */
white-space: normal;
white-space: nowrap;
white-space: pre;
white-space: pre-wrap;
white-space: pre-line;
white-space: break-spaces;

/* white-space-collapse 和 text-wrap 简写值 */
white-space: collapse balance;
white-space: preserve nowrap;
```

- `normal`：默认值，连续的空白符会被合并。源码中的换行符会被当作空白符来处理。并根据填充行框盒子的需要来换行。
- `nowrap`：和 normal 一样合并空白符，但阻止源码中的文本换行。
- `pre`：保留空白字符，但是只在遇到换行符或 `<br>` 时换行。
- `pre-line`：合并空白字符，保留换行符，文本换行。
- `pre-wrap`：保留空白字符和换行符，文本换行。
- `break-spaces`：与 pre-wrap 的行为相同，除了：
  - 任何保留的空白序列总是占用空间，包括行末的。
  - 每个保留的空白字符后（包括空白字符之间）都可以被截断。
  - 这样保留的空间占用空间而不会挂起，从而影响盒子的固有尺寸（最小内容——min-content——大小和最大内容——max-content——大小）。

以下是 `white-space` 的示例：

```css
/* 示例 */
.element {
  white-space: normal; /* 或 nowrap, pre, pre-line, pre-wrap */
}
```

## 二、word-break 属性

`word-break` 属性用于定义在什么位置断开单词，以便实现更好的排版效果。

* 语法：

```css
/* Keyword values */
word-break: normal;
word-break: break-all;
word-break: keep-all;
word-break: break-word; /* deprecated */
```

- `normal`：默认值，使用默认的断行规则。
- `break-all`：允许在单词内换行，适合处理长单词或URL。
- `keep-all`：禁止在东亚语言文字中的标点符号和字符内换行。
- `break-word`：他的效果是 `word-break: normal` 和 `overflow-wrap: anywhere` 的合，不论 overflow-wrap 的值是多少。

以下是 `word-break` 的示例：

```css
/* 示例 */
.element {
  word-break: normal; /* 或 break-all, keep-all */
}
```

## 三、综合运用

这两个属性在实际项目中通常会结合使用，以实现更灵活的文本排版效果。例如，可以使用 `white-space: nowrap;` 防止文本换行，再配合 `word-break: break-all;` 使得长单词或URL能够在容器内合适地换行显示。
通过合理地运用 `white-space` 和 `word-break` 属性，我们能够更好地掌控文本内容的呈现方式，提升用户体验，确保页面排版的清晰和美观。

参考文档：
- [MDN Web Docs - white-space](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)
- [MDN Web Docs - word-break](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break)

---

欢迎访问：[天问博客](https://tiven.cn/p/5ee54580/ "天问博客-专注于大前端技术")

