---
title: Git Commit 提交信息规范
tags:
- Git
categories:
- Git / Brew
abbrlink: 7af9b8c
date: 2022-10-01 21:43:20
---

在日常项目开发中，多人分工配合不可避免。一个好的团队，流程规范必不可少。而使用 **Git** 更是家常便饭，项目代码的提交，合并都需要有清晰的流程。为了团队成员方便查看每个版本的提交信息，又避免在提交记录中出现 **"黑历史"**，所以，**Git Commit 提交信息的规范** 尤为重要。

![Git Commit](https://tiven.cn/static/img/img-git-02-XHQJvbbdWZHA4Zj-cugng.jpg)

[//]: # (<!-- more -->)

## git message 提交信息类型

* **feat:** 一项新需求、新功能
* **fix:** 一个错误（bug）修复
* **docs:** 仅文档（readme）更改
* **style:** 不影响代码逻辑的更改（空白，格式，缺少分号，style，css修改等）
* **refactor:** 既不修正错误也不增加功能的代码更改（重构）
* **perf:** 改进性能的代码更改
* **test:** 添加缺失或更正现有测试
* **build:** 影响构建系统或外部依赖项的更改（webpack，vite，npm等）
* **ci:** 对CI配置文件和脚本的更改
* **chore:** 更改构建过程或辅助工具和库（babel，lodash）

## Example

1. 修复一个测试bug

```sh
git add .

git commit -m "fix: change main.js"

git push origin dev
```

2. 更新说明文档

```sh
git add .

git commit -m "docs: update readme.md"

git push origin dev
```

3. 项目功能优化

```sh
git add .

git commit -m "perf: input add debounce"

git push origin dev
```

参考文档：
* https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum
* https://commitlint.js.org/#/reference-rules
* https://www.jianshu.com/p/f51dbd8cbb73

---

欢迎访问：[天问博客](https://tiven.cn/p/7af9b8c/ "天问博客-专注于大前端技术")
