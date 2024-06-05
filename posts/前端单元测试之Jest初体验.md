---
title: 前端单元测试之Jest初体验
abbrlink: 276a8a53
date: 2022-04-19 17:05:34
tags:
- Node
- Jest
- npm
categories:
- 大前端
---

`Jest` 是一个令人愉快的 `JavaScript` 测试框架，专注于简洁明快。`Jest` 拥有良好的文档，只需很少的配置，并能根据你的需求进行扩展。它能确保任何 `JavaScript` 代码的正确性。它为你提供了易于理解、熟悉且功能丰富的 `API` 来编写测试用例，并快速地反馈结果。 

![单元测试 Jest](https://tiven.cn/static/img/img-jest-01-9DMqgrujfs2orHaPhpIiV.jpg)

[//]: # (<!-- more -->)

## 一、jest优势

1. **零配置：** `Jest` 的目标是在大部分 `JavaScript` 项目上实现开箱即用， 无需配置。
2. **快照：** 能够轻松追踪大型对象的测试。 快照可以与测试代码放在一起，也可以集成进代码行内。
3. **隔离：** 测试程序拥有自己独立的进程 以最大限度地提高性能。
4. **优秀的 api：** 从 `it` 到 `expect - Jest` 将整个工具包放在同一个 地方。好书写、好维护、非常方便。

## 二、安装

* 全局安装：

```shell
npm i -g jest
# or
cnpm i -g jest
# or
yarn global add jest
```

* 项目局部安装：

```shell
npm i -D jest
# or
cnpm i -D jest
# or
yarn add --dev jest
```

## 三、配置使用

1. 初始化项目，生成 `package.json` 文件和 `jest` 自定义配置文件

```shell
# 初始化，生成 package.json 文件
npm init -y

# 创建一个 jest 基础配置文件
jest --init 
```

2. 配置 `scripts` 脚本命令。

```json
{
  "scripts": {
    "test": "jest",
    "test:config": "jest test_dir --notify --config=config.json ",
    "test:output": "jest test_dir --outputFile=test.report.json --json"
  }
}
```

_命令解释：_

```shell
# 全局搜索 test.js 后缀文件执行单元测试
npm run test

# 使用 config.json 自定义配置文件进行单元测试
npm run test:config

# 将测试结果输出保存到 json 文件
npm run test:output
```

## 四、example

1. 创建一个 `demo.js` 文件，编写功能函数并 `exports` 导出。

```js
// ./demo.js

function sum(a, b) {
  return a + b;
}

function sort(arr=[]) {
  return arr.sort()
}

module.exports = {
  sum,
  sort,
}
```

2. 创建一个 `__tests__` 文件夹，并生成 `demo.test.js` 单元测试文件。

```js
// ./__tests__/demo.test.js

const { sum, sort } = require('../demo.js')

test('测试sum方法：10 + 20 = 30', () => {
  expect(sum(10, 10)).toBe(30);
})

describe('测试 sort 方法功能', ()=>{
  it('正常测试', ()=>{
    const data = sort([1,3,5,2,4]);
    expect(data).toEqual([1,2,3,4,5]);
  })
  it('不传值', ()=>{
    const data = sort();
    expect(data).toEqual([]);
  })
})
```

3. 使用 `npm test` 执行单元测试。

```shell
npm test
```

4. 输出

```txt
 PASS  ../demo.test.js
  √ 测试sum方法：10 + 20 = 30 (3 ms)
  测试 sort 方法功能
    √ 正常测试 (1 ms)
    √ 不传值 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.976 s, estimated 2 s
Ran all test suites matching /.\\demo.test.js/i.
```

5. `sum` 和 `sort` 方法单元测试通过。

## 五、jest总结

1. 当使用 `jest` 未指定测试的目录或具体文件时，会默认查找 `__tests__` 文件夹下的 `js|ts` 文件和以 `test.js` 为后缀的文件。
2. 建议所有的单元测试文件集中存放到单独的 `__tests__` 目录下，与业务功能代码隔离。
3. 推荐使用以功能方法名 + `.test.js` 的形式来命名对应的测试文件，例如：一个求和功能方法所在的文件为 `sum.js`，对应的单元测试文件就是 `sum.test.js`。
4. 常用的判断类型：`toBe` (值类型)、`toEqual` (引用类型)、`toBeNull`、`toBeDefined`、`toBeTruthy` (true)、`toBeFalsy` (false)、`toBeCloseTo` (约等于)、`toMatch` (匹配包含)、`toThrow`、`not` 修饰符( `not.toBe` )。
5. `describe` 搭配 `it` 相当于形成了一组测试，适用于一个功能方法对应了多个测试用例。

**参考文档：**
1. https://www.jestjs.cn/docs/getting-started

---

欢迎访问：[天问博客](https://tiven.cn/p/276a8a53/ "天问博客")
