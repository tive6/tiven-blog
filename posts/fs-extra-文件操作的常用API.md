---
title: fs-extra 文件操作的常用API
tags:
- Node
- fs
categories:
- Node
abbrlink: 7c6335c7
date: 2023-08-10 14:41:32
---

**fs-extra** 是一个比 **node** 内置 **fs** 模块更安全、更强大的文件操作库，支持 `promise` 和 `async/await`，为使用者免去了很多心理负担。

![fs-extra](https://tiven.cn/static/img/fs-01-PI8FJZ2Q.jpg)

<!-- more -->

## 一、安装使用

安装：

```shell
pnpm add fs-extra
```

文件复制代码演示：

```js
const {
  copy,
  copySync
} = require('fs-extra')

// 异步
copy('/tmp/myfile', '/tmp/mynewfile', err => {
  if (err) return console.error(err)
  console.log('success!')
})

// 同步
try {
  copySync('/tmp/myfile', '/tmp/mynewfile')
  console.log('success!')
} catch (err) {
  console.error(err)
}
```

## 二、常用API

1. **copy** : 复制文件或目录，目录可以包含内容。
1. **emptyDir** : 确保目录为空。如果目录不为空，则删除目录内容。如果该目录不存在，则创建该目录。目录本身不会被删除。
1. **ensureDir** : 确保目录存在。如果目录结构不存在，则创建它。
1. **ensureFile** : 确保文件存在。如果请求创建的文件位于不存在的目录中，则会创建这些目录。如果文件已存在，则不会对其进行修改。
1. **ensureLink** : 确保链接存在。如果目录结构不存在，则创建它。
1. **ensureSymlink** : 确保符号链接存在。如果目录结构不存在，则创建它。
1. **move** : 移动文件或目录，甚至跨设备移动。
1. **outputFile** : 几乎与（即它覆盖）相同 writeFile ，只是如果父目录不存在，则会创建它。 file 必须是文件路径（不允许使用缓冲区或文件描述符）。
1. **outputJson** : 与 几乎 writeJson 相同，只是如果目录不存在，则会创建该目录。
1. **pathExists** : 通过检查文件系统来测试给定路径是否存在。
1. **readJson** : 读取 JSON 文件，然后将其分析为对象。
1. **remove** : 删除文件或目录。目录可以包含内容。如果路径不存在，则静默不执行任何操作。
1. **writeJson** : 将对象写入 JSON 文件。

同步方法在对应方法后面加上 `Sync` 即可，如：`copySync`、`emptyDirSync` 等。

参考文档：https://github.com/jprichardson/node-fs-extra

---

欢迎访问：[天问博客](https://tiven.cn/p/7c6335c7/ "天问博客-专注于大前端技术")

