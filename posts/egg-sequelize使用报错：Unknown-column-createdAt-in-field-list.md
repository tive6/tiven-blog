---
title: egg-sequelize使用报错：Unknown column 'createdAt' in 'field list'
tags:
- Egg.js
- Node
- ORM
categories:
- Egg.js
abbrlink: d8619b5c
date: 2022-03-20 14:48:54
---

`sequelize` 是一个广泛使用的 `ORM` 框架，它支持 MySQL、PostgreSQL、SQLite 和 MSSQL 等多个数据源。最近在以 `Egg.js` 为基础框架的项目中使用 `egg-sequelize` 来操作 `MySQL`，使用 `model` 查询过程中出现一个报错：`nodejs.SequelizeDatabaseError: Unknown column 'createdAt' in 'field list'` 。

![egg-sequelize](https://tiven.cn/static/img/img-mysql-01-qhgrxcLM0m13IzfuSRqE3.jpg)

<!-- more -->

## 一、报错原因

`egg-sequelize` 插件创建 model 时，会默认包含 `createdAt` 和  `updatedAt` 字段。如果是要查询之前已经创建好的表，而其中又没有 `createdAt` 和  `updatedAt` 字段，就会出现以上报错。

## 二、解决办法

在 config 中对 `sequelize` 进行配置，不使用默认的 `timestamp` 字段。

```js
// config/config.default.js

config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'egg',
    define: {
        timestamps: false, // 关键配置，默认为 true， 修改为 false 即可
        freezeTableName: true,
    }
}
```

大功告成 ~O(∩_∩)O~

---

欢迎访问：[天问博客](https://tiven.cn/p/d8619b5c/ "天问博客")
