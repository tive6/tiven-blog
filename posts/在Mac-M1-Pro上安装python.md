---
title: 在Mac M1 Pro上安装python
tags:
- Python
- Mac
- brew
categories:
- Git / Brew
abbrlink: f62f1974
date: 2023-04-08 17:53:51
---

最近新换了电脑，因为在 **M1 Mac Pro** 上没有默认安装像 **python**、**nginx** 这种环境工具，所以需要自己配。
**世上无难事，只要找到 `Homebrew` 的正确安装方式**，所以本文就介绍怎么使用 `brew` 安装配置 `Python` 环境。

![brew install python](https://tiven.cn/static/img/img-shell-02-evtTjyGQiSI_3NqvVhdjy.jpg)

[//]: # (<!-- more -->)

## pyenv 介绍

`pyenv` 是 Python 版本管理工具，它就像 `nodejs` 的版本管理工具 `n` 和 `nvm`。 pyenv 可以改变全局的 Python 版本，在系统中安装多个版本的 Python， 设置目录级别的 `Python` 版本，还能创建和管理 virtual python environments 。所有的设置都是用户级别的操作，不需要 `sudo` 命令。
`pyenv` 的一个典型使用场景就是，比如一个老项目需要使用 Python 2.x ，而另一个新项目需要 Python 3.x 。而 virtualenv 主要是用来管理相同版本 Python 不同项目的包的依赖不同的问题，就无法解决这个问题，这个时候就需要 pyenv。

## brew 安装 python 步骤

1. 安装 pyenv

```shell
brew install pyenv
```

2. 安装 python 2.x

```shell
pyenv install 2.7.18
```

3. 设置到全局环境

```shell
pyenv global 2.7.18

export PATH="$(pyenv root)/shims:${PATH}"

echo 'PATH=$(pyenv root)/shims:$PATH' >> ~/.zshrc
```

参考文档：https://einverne.github.io/post/2017/04/pyenv.html

---

欢迎访问：[天问博客](https://tiven.cn/p/f62f1974/ "天问博客-专注于大前端技术")

