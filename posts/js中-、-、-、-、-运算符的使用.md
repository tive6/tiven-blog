---
title: js中 ||=、&&=、??=、?.、?? 运算符的使用
tags:
  - JS
categories:
  - 大前端
abbrlink: 9e1f6f3f
date: 2023-11-08 10:15:45
---

JavaScript 中存在一些特殊的运算符，如 `||=`、`&&=`、`??=`、`?.`、`??`，它们在特定的场景下能够帮助开发者简化代码逻辑或增强代码的健壮性。本文将介绍这些运算符的定义、语法、使用场景以及示例。

![js中 ||=、&&=、??=、?.、?? 运算符](https://tiven.cn/static/img/js-operator-FhoecVju.jpg)

<!-- more -->

## ||= 逻辑或赋值运算符 (Logical OR assignment)

- **定义**：`||=` 运算符用于指定变量在其值为假（Falsy）时才进行赋值操作。

- **语法**：`a ||= b`，意为若a为假，则将b赋值给a。

- **使用场景**：当需要为一个变量赋值，但仅在其当前值为假时执行赋值操作。

- **示例**：

```javascript
let x = 10;
let y = 0;
x ||= 5; // x仍为10，因为10被视为真值
y ||= 5; // y现在为5，因为0被视为假值
```

## &&= 逻辑与赋值运算符 (Logical AND assignment)

- **定义：** `&&=` 运算符用于指定变量在其值为真（Truthy）时才进行赋值操作。

- **语法：** `a &&= b`，意为若a为真，则将b赋值给a。

- **使用场景：** 在需要确保变量已经被定义且为真时进行赋值操作。

示例：

```js
let a = null;
let b = 15;
a &&= 10; // a仍为null
b &&= 20; // b现在为20
```

## ??= 逻辑空赋值运算符 (Nullish coalescing assignment)

- **定义**：`??=` 运算符用于指定变量在其值为null或undefined时才进行赋值操作。

- **语法**：`a ??= b`，意为若a为null或undefined，则将b赋值给a。

- **使用场景**：在确保一个变量不存在或其值为null时进行赋值操作。

示例：

```js
let c = null;
let d;
c ??= 5; // c现在为5
d ??= 10; // d现在为10
```

## ?. 可选链运算符 (Optional chaining)

- **定义**：`?.` 运算符用于在对象链深处避免出现异常，当对象链中的某个属性为null或undefined时，避免出现错误。

- **语法**：`obj?.prop`，若obj存在且有prop属性，则返回prop属性值，否则返回undefined。

- **使用场景**：在访问深层嵌套的对象属性时，避免因为中间某个属性为null或undefined导致的异常。

示例：

```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// Expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// Expected output: undefined
```

## ?? 空值合并运算符 (Nullish coalescing operator)

- **定义**：`??` 运算符用于在变量为null或undefined时提供默认值。

- **语法**：`a ?? b`，若a为null或undefined，则返回b，否则返回a。

- **使用场景**：在需要提供默认值的场景下，确保变量不为null或undefined。

示例：

```js
const foo = null ?? 'default string';
console.log(foo);
// Expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// Expected output: 0
```

## 总结

在实际的开发中，合理使用这些特殊运算符能够提高代码的可读性和健壮性，同时简化复杂的逻辑判断。但是，过度使用这些运算符也会导致代码的可读性降低，因此在使用时需要权衡利弊。

参考文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining

---

欢迎访问：[天问博客](https://tiven.cn/p/9e1f6f3f/ "天问博客-专注于大前端技术")

