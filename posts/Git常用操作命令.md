---
title: Git常用操作命令
abbrlink: 656d75c5
date: 2021-12-01 16:07:06
tags:
- Git
categories:
- Git / Brew
---

**Git**是目前世界上最先进的`分布式`版本控制系统（没有之一）。在日常开发中使用到的`git`操作命令挺多的，在此记录一下，以备忘却之需。

![Git Shell](https://tiven.cn/static/img/img-git-02-XHQJvbbdWZHA4Zj-cugng.jpg)

[//]: # (<!-- more -->)

## 一、常用操作命令

1. 查看修改内容

```sh
git diff test.txt
```

2. 查看提交的版本和提交ID

```sh
git log

# 以版本号的形式查看当前提交版本
git log --pretty=oneline

# 查看简写的提交记录
git log --oneline 

# 查看提交后的版本ID
git reflog

# 查看分支合并情况
git log --graph --pretty=oneline --abbrev-commit
```

3. 版本回退及撤销commit，撤销pull

```sh
# 参数说明
# --hard 删除工作空间改动代码，撤销commit，撤销git add .
# --soft 不删除工作空间改动代码，撤销commit，不撤销git add .

# 返回上一版本
git reset --hard HEAD^^

# 返回到前 1 版本
git reset --hard HEAD~1

# 返回到前 2 版本
git reset --hard HEAD~2

# 滚动到指定ID版本
git reset --hard [ID]

# 未 git add 撤销修改操作
git checkout -- test.js   # 撤销指定文件的修改
git checkout .            # 撤销全部修改

# 已 git add 撤销
git reset HEAD demo.txt
git checkout -- demo.txt
```

4. 删除分支

```sh
# 删除本地分支
git branch -D dev

# 删除远程分支
git push origin --delete dev
```

5. 合并分支

```sh
# dev 分支合并到 master 分支
git merge --no-ff -m "commit description" dev
```

- git merge --abort

```shell
#这个命令用于中止当前正在进行的合并操作。
#当你尝试合并两个分支时，如果合并过程中遇到冲突，Git会暂停合并并让你手动解决这些冲突。
#如果你决定不合并这些分支，或者想要放弃当前的合并尝试，可以使用 git merge --abort 来取消合并。
#执行这个命令后，Git会撤销合并过程中所做的所有更改，将你的工作目录和索引恢复到合并之前的状态。
git merge --abort
```

- git reset --merge

```shell
#这个命令用于重置当前的合并操作，但不中止合并。
#当你使用 git reset --merge 时，Git会重置你的工作目录和索引，使其与当前HEAD指针指向的提交状态一致。
#这个命令通常在解决合并冲突后使用，以确保工作目录和索引是干净的，然后你可以重新尝试合并。
#需要注意的是，这个命令不会撤销已经解决的合并冲突，它只是重置了工作目录和索引，所以你需要重新提交你的更改。
git reset --merge
```

总结：`git merge --abort` 用于完全放弃当前的合并尝试，而 `git reset --merge` 用于清理合并过程中的混乱，让你可以重新开始合并

6. 查看、设置分支
```sh
# 查看当前分支
git branch

# 查看所有分支
git branch -a

# 设置默认分支 master
git branch --set-upstream-to=origin/master master

# 切换分支
git checkout -b master
# or
git switch -c master	# Git 2.23 版本引入
```

7. tag操作

```sh
# 查看所有 tag
git tag

# 打 tag
git tag v1.0.0

# 显示指定版本详细信息
git show v1.0.0

# 为指定 tag 添加文字说明
git tag -a v0.3 -m "desc" ID

# 删除本地 tag
git tag -d v1.0.0

# 推送tag至远程库
git push origin v1.0.0

# 一次性推送全部本地tab
git push origin --tags

# 删除远程的 tag
git push origin :refs/tags/v1.0.0
```

8. 远程仓库信息

```sh
git remote -v
```

9. 关联远程仓库

```sh
# 删除 origin
git remote rm origin

# 关联远程
git remote add origin git@gitee.xxx.git
```

10. 推送至远程仓库

```sh
git push origin master

# 把本地库所有内容推送到远程库
git push -u origin master
```

11. 修改仓库地址

```sh
git remote set-url origin git@gitlab.xxx.git
```

12. 推送本地所有分支记录到远程

```sh
git push origin --all
```

13. 清除已经删除的远程分支记录

```sh
git remote prune origin
```

14. 创建SSH KEY

```sh
ssh-keygen -t rsa -C "yourName@163.com"
```

## 二、进阶用法

**场景：**
当你开发一个需求，你的工作进行到一半，这时有一个紧急的线上 bug 需要修复。但是又不想使用 `git commit` 来保存当前的代码，怎么办？
`Git` 还提供了一个 `stash` 功能，可以把当前工作现场 **储藏** 起来，等以后恢复现场后继续工作。

**相关命令：**

1. 储藏代码

```shell
git stash

# 加上描述信息
git stash save "xxx"
```

2. 查看缓存的列表

```shell
git stash list
```

3. 查看详情

```shell
git stash show [名]

# 例
git stash show stash@{0}

# 看详细差异
git stash show stash@{0} -p
```

4. 恢复储藏的代码

```shell
# 恢复后，stash 内容并不删除
git stash apply

# 恢复指定记录
git stash apply stash@{0}

# 恢复最新储藏的内容后，并删除堆中的记录
git stash pop

# 恢复指定记录，并删除
git stash pop stash@{1}
```

5. 删除缓存记录

```shell
# 清除单条记录
git stash drop stash@{0}

# 清除所有
git stash clear
```

6. 基于缓存创建分支

```shell
# 语法
git stash branch <branchname> [<stash>]

# 基于最新缓存创建分支
git stash branch new-branch

# 等价于
git checkout -b new-branch
git stash apply

# 基于指定缓存创建分支
git stash branch new-branch stash@{2}
```

7. 回退代码，又保留提交历史

具体操作：假设当前最新提交就在分支current-branch上，回退提交为prev-commit,这个回退提交可以是一次commit id，也可以是一个tag，也可以是一个分支名。

```shell
git checkout prev-commit
git diff current-branch > ~/diff.patch
git checkout current-branch
cat ~/diff.patch | git apply
git commit -am "roll back to prev-commit"
git push
```

---

## Git 相关系列

* [Git常用操作命令](https://tiven.cn/p/656d75c5/ "Git常用操作命令 | 天问博客")
* [Git配置别名简化操作命令](https://tiven.cn/p/5444056d/ "Git配置别名简化操作命令 | 天问博客")
* [Git删除远程某个历史提交记录](https://tiven.cn/p/b87d03eb/ "Git删除远程某个历史提交记录 | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/656d75c5/ "天问博客")
