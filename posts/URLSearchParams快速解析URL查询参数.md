---
title: URLSearchParams快速解析URL查询参数
tags:
- DOM
- JS
categories:
- JavaScript
abbrlink: c97e10f5
date: 2022-11-01 11:30:21
---

浏览器 Window 内置的 **URLSearchParams** 接口定义了一些实用的方法来处理 URL 的查询字符串，再也不用 `&` 字符串分割的方式去解析 **url query** 参数了。 

![JS && URLSearchParams](https://tiven.cn/static/img/img-code-01-7U2hE-WxCSE_fII7vL3l5.jpg)

<!-- more -->

## 一、URLSearchParams 构造函数

`URLSearchParams()` 构造器创建并返回一个新的 **URLSearchParams** 对象。开头的 `?` 字符会被忽略。

```js
let oUSP = URLSearchParams()

console.log(oUSP)

/*
URLSearchParams {}
  [[Prototype]]: URLSearchParams
    append: ƒ append()
    delete: ƒ delete()
    entries: ƒ entries()
    forEach: ƒ forEach()
    get: ƒ ()
    getAll: ƒ getAll()
    has: ƒ has()
    keys: ƒ keys()
    set: ƒ ()
    sort: ƒ sort()
    toString: ƒ toString()
    values: ƒ values()
    constructor: ƒ URLSearchParams()
    Symbol(Symbol.iterator): ƒ entries()
    Symbol(Symbol.toStringTag): "URLSearchParams"
    [[Prototype]]: Object
* */
```

## 二、URLSearchParams 方法

该接口不继承任何属性。

* **append**：插入一个指定的键/值对作为新的搜索参数。
* **delete**：从搜索参数列表里删除指定的搜索参数及其对应的值。
* **set**：设置一个搜索参数的新值，假如原来有多个值将删除其他所有的值。  
* **keys**：返回iterator 此对象包含了键/值对的所有键名。
* **values**：返回iterator 此对象包含了键/值对的所有值。
* **entries**：返回一个iterator可以遍历所有键/值对的对象。
* **forEach**：插入一个指定的键。
* **get**：获取指定搜索参数的第一个值。
* **getAll**：获取指定搜索参数的所有值，返回是一个数组。
* **has**：返回 Boolean 判断是否存在此搜索参数。
* **sort**：按键名排序。
* **toString**：返回搜索参数组成的字符串，可直接使用在 URL 上。

## 三、使用示例

```js
let { search } = new URL('https://tiven.cn?id=12&dt=2022-10-10&sort=desc')
console.log(search) // ?id=12&dt=2022-10-10&sort=desc

// 创建 URLSearchParams 对象
let p1 = new URLSearchParams(search);
let p2 = new URLSearchParams([["id", 12], ["dt", '2022-10-10'], ["sort", 'desc']]);
let p3 = new URLSearchParams({"id": 12 , "dt": '2022-10-10', "sort": 'desc'});
console.log(p1.toString()) // id=12&dt=2022-10-10&sort=desc
console.log(p2.toString()) // id=12&dt=2022-10-10&sort=desc
console.log(p3.toString()) // id=12&dt=2022-10-10&sort=desc

// entries
for (let [k, v] of p1.entries()) {
  console.log(k, v)
}

// forEach
p1.forEach((v,k)=>{
  console.log(k, v)
})

// has 判断是否包含某个查询参数
console.log(p1.has('id')) // true
console.log(p1.has('name')) // false

// get 获取某个参数值
console.log(p1.get('id')) // 12
console.log(p1.get('age')) // null

// append 添加键值对
p1.append('name', 'Tiven')
console.log(p1.toString()) // id=12&dt=2022-10-10&sort=desc&name=Tiven

// delete 删除键值对
p1.delete('name')
console.log(p1.toString()) // id=12&dt=2022-10-10&sort=desc

// sort 排序
p1.sort()
console.log(p1.toString()) // dt=2022-10-10&id=12&sort=desc
```

**注意：** **URLSearchParams** 构造函数不会解析完整 **URL**，但是如果字符串起始位置有 `?` 的话会被去除。

```js
let p = new URLSearchParams('https:tiven.cn?id=12&name=Tiven')
console.log(p.has('id'))  // false
console.log(p.get('id'))  // null
console.log(p.toString()) // https%3Ativen.cn%3Fid=12&name=Tiven
```

---

欢迎访问：[天问博客](https://tiven.cn/p/c97e10f5/ "天问博客-专注于大前端技术")

