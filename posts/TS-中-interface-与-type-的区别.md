---
title: TS 中 interface 与 type 的区别
tags:
- TS
categories:
- TypeScript
abbrlink: ff052d0f
date: 2023-08-03 20:17:38
---

在 TypeScript 中，interface 和 type 都可以用来定义一个数据的类型，那么它们有什么区别呢？

![TypeScript](https://tiven.cn/static/img/img-ts-01-Xyj6BEm7dx6FDpFKrbJGp.jpg)

<!-- more -->

## 一、interface 接口类型

interface 是一种用来声明对象类型的方式:

```typescript
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: 'tiven',
  age: 18,
};
```

可以使用 **extends** 关键字对 **interface** 进行继承:

```typescript
interface Person {
  name: string;
  age: number;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  name: 'tiven',
  age: 18,
  grade: 1,
};
```

## 二、type 类型别名

在 ts 里，我们可以使用 **type** 关键词来给任意类型添加命名，这样可以方便引用和复用:

```typescript
type Person = {
  name: string;
  age: number;
};

const person: Person = {
  name: 'tiven',
  age: 18,
};
```

使用 **&** 符号将多个 **type** 进行组合:

```typescript
type Person = {
  name: string;
  age: number;
};

type Student = {
  grade: number;
};

type StudentPerson = Person & Student;
```

使用 **|** 符号将多个常量组成 **union** 联合类型：

```typescript
type Status = 'success' | 'error' | 'warning';

const status: Status = 'success';
```

## 三、interface 和 type 的区别

1. interface 的重复声明可以合并，type 不能重复声明:

```typescript
interface Person {
  name: string;
  age: number;
}

interface Person {
  grade: number;
}

type Person = { // ❌ Error: type 不能重复声明
  name: string;
  age: number;
}
```

2. `interface` 只能声明对象类型，但 `type` 除了对象类型以外，还可以声明简单类型和 **union** 联合类型
3. `type` 通过 **&** 符号进行类型合并，而 `interface` 通过 **extends** 关键词实现继承


参考文档：https://mp.weixin.qq.com/s/3myeGg0A8yUq4E04gXzREA

---

欢迎访问：[天问博客](https://tiven.cn/p/ff052d0f/ "天问博客-专注于大前端技术")

