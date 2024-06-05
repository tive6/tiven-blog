---
title: '[vite] Internal server error: ENAMETOOLONG: name too long, stat ''/Users/xxx'''
tags:
  - Vite
categories:
  - Vite
abbrlink: 41f65080
date: 2024-04-05 17:44:05
---

使用 vite + vue3 开发项目，在启动服务时，出现如下报错：`[vite] Internal server error: ENAMETOOLONG: name too long, stat '/Users/xxx'`。

![vite](https://tiven.cn/static/img/vite-03-xbVS9jZm.jpg)

[//]: # (<!-- more -->)

- `package.json` 依赖配置

```json
{
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.1.0",
    "vite": "^4.1.0"
  },
}
```

- 完整报错

```js
[vite] Internal server error: ENAMETOOLONG: name too long, stat '/Users/admin/Desktop/dev/annotation-fe/mark-audio?id=45342&status=view&viewMode=audit_view&page=approve&condition=%7B%22sampleBusiId%22%3A%22%22%2C%22annoStatus%22%3A3%2C%22taskIdNameInVague%22%3A%22%22%2C%22annoUserDomain%22%3A%22%22%2C%22purposeId%22%3A2%2C%22submitTimeBeginEnd%22%3A%22%22%7D'
      at Object.statSync (node:fs:1659:25)
```

- 报错原因

报错原因是因为文件路径过长，导致系统无法创建文件。

- 解决方案

1. 修改 `package.json` 中的 `vite` 版本。

```json
{
  "devDependencies": {
    "vite": "^4.1.1"
  },
}
```

2. 删除 `node_modules` 目录和 `package-lock.json` 、 `yarn.lock` 、 `pnpm-lock.yaml` 文件。
3. 重新 `pnpm i` 安装依赖。
4. 重新启动项目。

参考文档：

- https://github.com/vitejs/vite/issues/11904
- https://github.com/vaadin/flow/pull/15807

---

欢迎访问：[天问博客](https://tiven.cn/p/41f65080/ "天问博客-专注于大前端技术")

