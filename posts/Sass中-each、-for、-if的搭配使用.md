---
title: Sass中each、for、if的搭配使用
tags:
- CSS
- Sass
categories:
- CSS3
abbrlink: d5fe863
date: 2022-08-15 17:37:37
---

**CSS** 预处理器赋予了 **CSS** 逻辑编程的能力，其中 `Sass、Less、Stylus` 最受欢迎，语法都是大同小异，上手也很快。在项目中使用最多的可能要数 **Sass** 了，本文就讲讲 **Sass** 中循环遍历 `@each`、`@for` 和 `@if` 判断的搭配使用。

![Sass && 循环遍历](https://tiven.cn/static/img/img-sass-01-GS5LQHZQxfhJcSbG2NjuY.jpg)

[//]: # (<!-- more -->)

## 一、@for
  
`@for` 语法需要搭配 `from` 和 `through` 关键字使用，eg：

```scss
@for $index from 1 through 5 {
    .box-bg-#{$index} {
        background: url("../img/bg-#{$index}.png") no-repeat;
        background-size: 100%;
    }
}
```

**编译后生成：**

```css
.box-bg-1 {
    background: url("../img/bg-1.png") no-repeat;
    background-size: 100%;
}

.box-bg-2 {
    background: url("../img/bg-2.png") no-repeat;
    background-size: 100%;
}

.box-bg-3 {
    background: url("../img/bg-3.png") no-repeat;
    background-size: 100%;
}

.box-bg-4 {
    background: url("../img/bg-4.png") no-repeat;
    background-size: 100%;
}

.box-bg-5 {
    background: url("../img/bg-5.png") no-repeat;
    background-size: 100%;
}
```

## 二、 `@for` 搭配 `nth` 内置函数循环遍历取值

* `nth` 内置函数的作用：可以使用 `@for` 循环的下标 `index` 获取对应 `list` 的值。

```scss
@use "sass:list";

$colors: #f00, #0f0, #00f;

@for $index from 1 through length($colors) {
  .annotator-hl-#{$index} {
    background: list.nth($colors, $index);
    cursor: pointer;
  }
}
```

**编译后生成：**

```scss
.annotator-hl-1 {
  background: #f00;
  cursor: pointer;
}

.annotator-hl-2 {
  background: #0f0;
  cursor: pointer;
}

.annotator-hl-3 {
  background: #00f;
  cursor: pointer;
}
```

## 三、@each

`@each` 语法需要 `list` 类似于 `JS` 中 `Array` 数语的结构，可以先声明一个数组 `list` 变量，eg：

```scss
$states: 'before', 'ing', 'after';
@each $name in $states {
    .box .#{$name} {
        @if $name == 'after' {
            $name: 'before'
        }
        background: url("../img/bg-#{$name}.png") no-repeat;
        background-size: 100%;
    }
}
```

**编译后生成：**

```css
.box .before {
    background: url("../img/bg-before.png") no-repeat;
    background-size: 100%;
}

.box .ing {
    background: url("../img/bg-ing.png") no-repeat;
    background-size: 100%;
}

.box .after {
    background: url("../img/bg-before.png") no-repeat;
    background-size: 100%;
}
```

**注意：** 
* 其中做了一个 **@if** 判断，当变量 `$name == 'after'` 时，把变量赋值为 `before` ；
* 当变量和字符串拼接时，一定要使用 `#{$var}` 的形式（类似ES6中的**模板字符串**），否则编译会报错。

## 四、if 函数

基于所述条件，内置 `if()` 函数从两个可能的结果返回一个结果。所述函数结果可能不能定义或进一步计算变量。

语法：

```scss
if( expression, value1, value2 )
```

示例：

```scss
h2{
   color: if( 1 + 1 == 2 , green , red);
}
```

编译后：

```css
h2{
   color: green;
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/d5fe863/ "天问博客-专注于大前端技术")

