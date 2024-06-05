---
title: Git配置别名简化操作命令
abbrlink: 5444056d
date: 2021-11-18 15:57:51
tags:
- Git
categories:
- Git / Brew
---

`Git` 中有些操作命令比较长，单词多，不容易记忆。例如把一个dev开发分支合并到master分支，就需要敲：`git merge --no-ff -m "提交合并" dev` 这么长的命令。如果git命令不熟练的话很容易就敲错，这个问题就可以通过`配置别名`来简化git命令。

![Git 配置别名](https://tiven.cn/static/img/highway-night-traffic-light-preview-CTGyb5G22BKkJWkcEg121.jpg)

<!-- more -->

## 一、配置别名

Git`配置别名`通常有两种方式：

- 命令行配置
- 修改`config`文件

### 1.命令行配置别名

```sh
git config --global alias.st status
```

这个命令就相当于把`status`简化为`st`。

通过配置别名后以下两个命令完全等价，所以查看本地的修改状态就可以执行：

```sh
git status
# or
git st
```

### 2.通过配置文件配置别名

git配置又分为两种：

- 2-1.每个仓库内部的配置文件，基本都放在项目根目录`.git/config`文件中。如下：

```txt
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
	hideDotFiles = dotGitOnly
[remote "origin"]
	url = http://gitlab.com/demo/test
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
[alias]
    st = status 
    br = branch
    	
```

- 2-2.当前用户目录下有一个全局的git配置文件`.gitconfig`，配置如下：

```txt
[alias]
	st = status
[user]
	name = yourname
	email = 123456@qq.com
[push]
	default = matching
```

如果想要增加别名，就可以在`[alias]`下边添加，一行对应一个别名。
如果通过命令行配置的别名有误，想修改，则可以通过删除`.gitconfig`文件`[alias]`中对应的行，再重新通过命令配置或者直接修改配置文件。

## 二、常用别名配置

```txt
[alias]
	st = status
	cm = commit -m
	ck = checkout
	cb = checkout -b
	ba = branch -a
	br = branch
	bd = branch -D
	pbd = push origin --delete
	mg = merge --no-ff -m
	clog = log --graph --pretty=oneline --abbrev-commit
	po = push origin
	pl = pull origin
	pm = pull origin master
	pts = push --tags
	rp = remote prune origin
	
# git push origin tagname
# git push origin --tags
# git remote prune origin  清除已经删除的远程分支的本地记录	

```

这些是我平常开发过程中比较常用的一些`别名配置`，当然可以根据个人喜好或便于记忆的方式进行个性化配置。

---

## Git 相关系列

* [Git常用操作命令](https://tiven.cn/p/656d75c5/ "Git常用操作命令 | 天问博客")
* [Git配置别名简化操作命令](https://tiven.cn/p/5444056d/ "Git配置别名简化操作命令 | 天问博客")
* [Git删除远程某个历史提交记录](https://tiven.cn/p/b87d03eb/ "Git删除远程某个历史提交记录 | 天问博客")

---

欢迎访问：[天问博客](https://tiven.cn/p/5444056d/ "天问博客")
