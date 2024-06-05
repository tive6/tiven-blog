---
title: 'Git提示fatal: refusing to merge unrelated histories'
tags:
- Git
categories:
- Git / Brew
abbrlink: b3fa3e34
date: 2023-08-25 15:55:17
---

使用 `git remote add origin git@gitlab.test.com/fe-test.git` 关联远程仓库，然后使用执行 `git push -u origin master` 报错：`fatal: refusing to merge unrelated histories`，`Updates were rejected because the tip of your current branch is behind its remote counterpart`。

![Git](https://tiven.cn/static/img/img-git-02-XHQJvbbdWZHA4Zj-cugng.jpg)

<!-- more -->

## 一、完整报错

1. `git pull origin master` ，报错：`fatal: refusing to merge unrelated histories`
2. `git push -u origin master`，报错：`Updates were rejected because the tip of your current branch is behind its remote counterpart`

## 二、解决办法

在 `git pull` 的时候加上 **--allow-unrelated-histories** 参数，作用就是把两个不相干的分支进行强行合并。

```bash
# 合并
git pull origin master --allow-unrelated-histories

# 再次push
git push -u origin master
```

---

欢迎访问：[天问博客](https://tiven.cn/p/b3fa3e34/ "天问博客-专注于大前端技术")

