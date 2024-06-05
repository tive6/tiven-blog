---
title: Javascript常用小技巧
abbrlink: d27b83ca
date: 2022-02-16 11:39:24
tags:
- JS
categories:
- JavaScript
---

收集汇总平时开发过程中的 **Javascript** 常用小技巧和方法。如：伪（类）数组转数组、获取数据类型、生成随机ID、日期时间格式化等等，将不定时补充更新。

![Javascript](https://tiven.cn/static/img/img-js-04-dPIVRzlwMdj1V8eRB3tje.jpg)

[//]: # (<!-- more -->)

## 一、伪（类）数组转数组

日常类数组对象：
* `{0:1, 1:'abc', length:2}`    
* `DOM HTMLCollection`对象 和 `NodeList` 对象
* `arguments`对象

```js
// 类数组
var ls = document.getElementsByName('span')
console.log(ls)

// 方法一
var li = Array.prototype.slice.apply(ls)
console.log(li)

// 方法二
var arr = [].slice.apply({0:1, 1:'abc', length:2})
console.log(arr)

// 方法三
var list = Array.from(ls)
console.log(list)

// 原因
console.log([].__proto__ === Array.prototype)   // true
```

## 二、获取数据类型

借助 `Object.prototype.toString` 和 `call` 封装方法

```js
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

getType(NaN)      // Number
getType(null)     // Null
getType(undefined)// Undefined
getType(true)     // Boolean
getType(12)       // Number
getType('abc')    // String
getType([])       // Array
getType({})       // Object
getType(Date)     // Function
getType(Symbol)   // Function
getType(Promise)  // Function
getType(window)   // Window
getType(document) // HTMLDocument
```

## 三、生成随机ID

利用 `Math.random` 和 `toString` 封装方法

```js
function getUuid() {
  return Math.random().toString(36).toUpperCase().slice(2)
}

getUuid()   // AXDVJWW2P2G
getUuid()   // 69YB3NFCEM7
getUuid()   // H5JHQSSUEBL
getUuid()   // GVOI0V4KRMR
```

## 四、日期时间格式化

基于 `Date` 对象和 `正则` 封装方法

```js
function formatFixedDate(date, fmt) {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  if (!(date instanceof Date)) {
    return '';
  }
  if (typeof date === 'string') {
    date = date.includes('0+0000') ? date.substr(0, 19) : date;
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  const week = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[`${date.getDay()}`]);
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
}

formatFixedDate(Date.now(), 'yyyy-MM-dd HH:mm:ss')                  // 2022-02-16 18:01:14
formatFixedDate(new Date('2022-01-01'), 'yyyy年M月d日 HH:mm:ss')    // 2022年1月1日 08:00:00
```

## 五、数组与树形结构相互转换

* 扁平化数组 to 树形结构

```js
// 简单版
function arrayToTree(list, pid = 0) {
  return list.filter(item => item.pid === pid).map(item => ({
    ...item,
    children: arrayToTree(list, item.id),
  }));
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
function handleTree(data=[], id, parentId, children, rootId) {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  rootId = rootId || null
  if (!Array.isArray(data)) return [] 
  // 对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有项
  const treeData = cloneData.filter((father) => {
    const branchArr = cloneData.filter((child) => {
      // 返回每一项的子级数组
      return father[id] === child[parentId]
    })
    branchArr.length > 0 ? (father.children = branchArr) : ''
    // 返回第一层
    return father[parentId] === rootId
  })
  return treeData !== '' ? treeData : data
}
```

* 树形结构 to 扁平化数组

```js
function treeToArray(list, newArr = []) {
  list.forEach((item) => {
    const { children } = item;
    if (children) {
      delete item.children;

      if (children.length) {
        newArr.push(item);
        return treeToArray(children, newArr);
      }
    }
    newArr.push(item);
  });
  return newArr;
}
```

## 六、限制请求并发数量

```js
function multiRequest(urls = [], maxNum) {
  // 请求总数量
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;

  return new Promise((resolve, reject) => {
    // 请求maxNum个
    while (count < maxNum) {
      next();
    }
    function next() {
      let current = count++;
      // 处理边界条件
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result);
        // console.log(result)
        return;
      }
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());
      new Promise((resolve, reject)=>{
        let timer = setTimeout(()=>{
          resolve(url)
          clearTimeout(timer)
          timer = null
        }, Math.random()*2000+1000)
      }).then().finally((res)=>{
        console.log(`结束 ${current}-${url}`, new Date().toLocaleString());
        result[current] = url;
        // 请求没有全部完成, 就递归
        if (current < len) {
          next();
        }
      })
    }
  });
}

let list = [1,2,3,4,5,6,7,8,9,10]
multiRequest(list, 6)
```

---

欢迎访问：[天问博客](https://tiven.cn/p/d27b83ca/ "天问博客")
