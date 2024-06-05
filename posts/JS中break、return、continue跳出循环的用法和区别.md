---
title: JS中break、continue、return跳出循环的用法和区别
tags:
- JS
categories:
- JavaScript
abbrlink: 6195dbbd
date: 2022-07-08 10:56:52
---

在前端开发中，使用循环遍历操作肯定不可避免。常用的循环语句如：**for、do/while、while、for/in、for/of、forEach、map** 等等，日常开发时经常会遇到遍历某些值要跳过循环、或者中断循环，这时就要用到 **break、return、continue** 等关键词来区别处理。

![break && return && continue](https://tiven.cn/static/img/img-js-03-pqLtfAZcQURmUDXYM4DYu.jpg)

[//]: # (<!-- more -->)

## 一、break

**作用：** 立刻退出包含在最内层的循环或者退出一个 `switch` 语句。

**使用特点：**
1. **switch** 判断语句
2. 循环语句：**for、do/while、while、for/in、for/of**
3. 不能在 **forEach、map** 遍历中使用，否则会报错：`Uncaught SyntaxError: Illegal break statement`

**例：**

```js
function fn() {
  let arr = [1,2,3,4,5]
  for (let item of arr) {
    if (item===3) {
      break
    }
    console.log(item)
  }
}

fn()

/* 输出： */
//  1
//  2
```

## 二、continue

**作用：** `continue` 语句和 `break` 语句相似，不同的是，`continue` 不退出循环，只跳过当前循环。

**使用特点：**
1. **switch** 判断语句
2. 循环语句：**for、do/while、while、for/in、for/of**
3. **continue** 在 `do/while`、`while` 循环体中使用，会出现 **死循环**，引起程序崩溃，一定要慎之又慎

**例：** 以下循环只跳过了 `i === 3` 时的这一次迭代。

```js
function fn() {
  for(var i = 0; i < 5; i++) {
    if(i === 3) {
      continue
    }
    console.log(i)
  }
}

fn()

/* 输出： */
//  0
//  1
//  2
//  4
```

## 三、return

**作用：** `return` 用于返回函数的返回值，因此 `return` 语句只能出现在函数体内，否则会报错：`Uncaught SyntaxError: Illegal return statement` 。

**使用特点：**
1. 只能用在 `function` 函数体内
2. 在 **for、do/while、while、for/in、for/of** 中会退出循环，类似 `break` 的效果
3. 在 **forEach、map** 遍历中，只跳过当前循环，会继续下次迭代，类型 `continue` 的效果

**例1：** 在 `while` 中当执行到 `i === 3` ，会退出循环。

```js
function fn() {
  let i = 0
  while (i<5) {
    if (i===3) {
      return
    }
    console.log(i)
    i ++
  }
}

fn()

/* 输出： */
//  0
//  1
```

**例2：** 在 `forEach` 循环中只跳过了 `i === 2` 时的这一次迭代。

```js
function fn() {
  let arr = Array(5).fill(1)
  arr.forEach((item, index)=>{
    if (index===2) {
      return
    }
    console.log(index)
  })
}

fn()

/* 输出： */
//  0
//  1
//  3
//  4
```

---

欢迎访问：[天问博客](https://tiven.cn/p/6195dbbd/ "天问博客-专注于大前端技术")

