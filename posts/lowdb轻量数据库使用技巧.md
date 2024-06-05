---
title: lowdb轻量数据库使用技巧
tags:
- Node
- DB
- json
categories:
- Node
abbrlink: 22f9784e
date: 2023-08-13 17:40:38
top: 9
---

`lowdb` 是一个简单易用的本地 **JSON** 数据库，使用原生 JavaScript API 进行查询。在几个项目应用过，记录下常用的API和使用技巧。

![lowdb 数据库](https://tiven.cn/static/img/lowdb-01-TlIJDAmg.jpg)

<!-- more -->

> 使用的lowdb版本：`"^1.0.0"`

## 一、安装和用法

```shell
pnpm add lowdb@1.0.0
```

基本用法：

```js
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {join} = require("path");

const adapter = new FileSync(join(__dirname, 'db.json'));
const db = low(adapter);
```

## 二、常用操作

1. 初始化数据，相当于建表，如果已存在，则不会重复创建，也不会覆盖原有数据。

```js
db.defaults({ 
  posts: [], 
  user: {
    name: 'tiven',
    age: 18,
    city: 'shanghai',
    language: ['javascript', 'nodejs', 'vue', 'react', 'angular']
  } }).write();
```

2. 查询

```js
// 查询所有数据
db.get('posts').value();

// 查询单条数据
db.get('posts').find({ id: 1 }).value();

// 查询多条数据
db.get('posts').filter({ status: 1 }).value();

// 查询表中数据的条数
db.get('posts').size().value();

// 查询表中是否存在某条数据
db.get('posts').find({ id: 1 }).has('id').value();

// 多属性查询
db.get('users.language').value();

// 获取特定字段集合
db.get('posts').map('id').value();
```

2. 插入

```js
// 插入单条数据
db.get('posts').push({ id: 1, title: 'lowdb' }).write();

// 插入多条数据
db.get('posts').push([{ id: 1, title: 'lowdb' }, { id: 2, title: 'lowdb' }]).write();

// 插入表中所有数据
db.get('posts').map(({ title, desc, id }) => ({ title, desc, id })).write();
```

3. 更新

```js
// 更新单条数据
db.get('posts').find({ id: 1 }).assign({ title: 'lowdb' }).write();

// 更新多条数据
db.get('posts').filler({
  age: 18,
}).assign({
  updateAt: new Date(),
}).write();

// 更新属性
db.get('users').set('age', 20).write();
// or
db.set('users.set', 20).write();
```

4. 删除

```js
// 删除单条数据
db.get('posts').remove({ id: 1 }).write();

// 删除多条数据
db.get('posts').remove({ status: 1 }).write();

// 删除表中所有数据
db.get('posts').remove().write();

// 移除属性
db.unset('users.name').write();
```

5. 排序

```js
// 升序 asc 
db.get('posts').sortBy('age').value();

// 降序 desc
db.get('posts').orderBy('age', 'desc').value();

// 截取 0 ~ 5 条数据
db.get('posts').take(5).value();
```

6. 深拷贝

```js
db.get('users').cloneDeep().value();
```

更多使用方法请参考：[lodash 官方文档](https://www.lodashjs.com/ "lodash 官方文档") ，基本都是通用的。

## 三、进阶用法

数据加解密

```js
var crypto = require('crypto')

var cipher = crypto.createCipher('aes256', secretKey)
var decipher = crypto.createDecipher('aes256', secretKey)

low.stringify = function(obj) {
  var str = JSON.stringify(obj)
  return cipher.update(str, 'utf8', 'hex') + cipher.final('hex')
}

low.parse = function(encrypted) {
  var str = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
  return JSON.parse(str)
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/22f9784e/ "天问博客-专注于大前端技术")

