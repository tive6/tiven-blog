---
title: 'parcel报错Error: Expected content key de1e4a02ec63c4eb to exist'
tags:
- Parcel
categories:
- webpack / parcel
abbrlink: e1b521be
date: 2023-06-30 16:38:00
---

使用 **Parcel** 编译运行 **TypeScript** 出现报错：`Error: Expected content key de1e4a02ec63c4eb to exist`。

![Parcel TypeScript](https://tiven.cn/static/img/img-parcel-02-CNX0p6DL5IpDt52RYJmKR.jpg)

[//]: # (<!-- more -->)

## 一、使用场景

在页面上直接以 `<script src="./index.ts" ></script>` 的形式导入 TS 文件，可以正常运行。
但是，如果在 `index.ts` 中用 **import** 的形式又导入了其他 TS ，则会出现上边的报错。

* 目录结构

```txt
.parcel-cache/
dist/
01.ts
02.ts
index.ts
index.html
package.json
tsconfig.json
```

* index.ts

```ts
import './01.ts'
import './02.ts'
```

* index.html

```html
<!DOCTYPE html>
<html lang='zh'>
<head>
  <meta charset='UTF-8'>
  <title>TS 测试入口</title>
</head>
<body>

<script src='index.ts'></script>
</body>
</html>
```

* 运行

```shell
parcel index.html
```

将会得到上述错误。

## 二、问题原因

1. 由于 parcel 运行后会生成缓存文件，也就是上边出现的 `.parcel-cache` 和 `dist` 目录，会影响浏览器运行。
2. 在 `index.ts` 中使用了 **import** 语法，浏览器默认是不支持的。

## 三、问题解决

1. 删除 `.parcel-cache` 和 `dist` 目录
2. 修改 `index.html` 中 `index.ts` 的导入模式，增加 `type='module'` 属性，让浏览器识别 **import** 语法

```html
<script src='index.ts' type='module'></script>
```

---

欢迎访问：[天问博客](https://tiven.cn/p/e1b521be/ "天问博客-专注于大前端技术")

