---
title: git merge 与 git rebase 的区别和使用场景
tags:
- Git
categories:
- Git / Brew
abbrlink: ab6e6231
date: 2023-05-24 10:37:08
---

当涉及 Git 中的代码整合时，`git merge` 和 `git rebase` 是两个常用的命令。尽管它们都用于将不同分支的更改合并到一起，但它们的工作方式和使用场景有一些不同。

![Git merge & rebase](https://tiven.cn/static/img/img-git-02-XHQJvbbdWZHA4Zj-cugng.jpg)

[//]: # (<!-- more -->)

## 一、Git Merge

`git merge` 用于将两个不同分支的更改合并为一个新的合并提交（`merge commit`）。这种合并 **保留了原始分支的提交历史，并在合并提交中记录了合并的信息** 。这样的方法能够清晰地显示出哪些分支是在一起合并的。

使用场景：

- 在多人协作中，当你想将一个特性分支的更改合并回主分支（如 master）时，通常使用 git merge。
- 如果分支历史相对复杂，你希望保留提交历史，那么使用 `git merge` 会更合适。

## 二、Git Rebase

`git rebase` 用于将一个分支的更改移动到另一个分支的顶部。在这个过程中，你的分支上的提交会被重新应用，看起来好像是基于目标分支的最新提交。这导致了一个更线性的提交历史，避免了额外的合并提交。

使用场景：

- 当你希望在将分支合并回目标分支之前，将你的提交整合到目标分支的最新提交中时，可以使用 `git rebase`。
- 如果你希望保持提交历史较为清晰和线性，那么 `git rebase` 更适合。

## 三、区别与注意事项

- **git merge** 创建合并提交，保留原始分支的提交历史，但可能会引入更多的合并提交。
- **git rebase** 重新应用提交，使其看起来基于目标分支的最新提交，产生一个更线性的提交历史。

**注意：** 在共享的分支上使用 git rebase 可能会导致问题，因为它会改变提交历史。只有在本地分支或确保其他协作者了解并同意改变历史的情况下，才应该使用 git rebase。

## 四、总结

无论你选择使用 git merge 还是 git rebase，都要根据项目需求、团队协作方式以及你对提交历史的偏好进行选择。在使用这些命令时，请确保充分理解其影响，以避免潜在的问题。

---

欢迎访问：[天问博客](https://tiven.cn/p/ab6e6231/ "天问博客-专注于大前端技术")

