---
title: Linux Centos 系统安装 nvm 管理 nodejs版本
tags:
- Linux
- Node
- nvm
categories:
- Linux / Shell
abbrlink: 83b2fa23
date: 2023-06-28 17:53:53
---

在 Linux 服务器上也会经常遇到切换 nodejs 版本的情况，所以就需要安装 nvm 工具管理 node 版本。

![Centos nvm](https://tiven.cn/static/img/img-nvm-523XwPXpkp1yisPBwEqwd.jpg)

[//]: # (<!-- more -->)

## 下载 nvm 

1. curl 工具下载

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

2. wget 工具下载

```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

3. git 工具下载，推荐使用国内 **gitee** 源

```shell
# 很慢
git clone https://github.com/nvm-sh/nvm/releases/tag/v0.39.2 nvm 
# 推荐使用
git clone https://gitee.com/Annlix/nvm-sh_nvm.git nvm
```

## 配置 nvm 到环境变量

主要讲一下使用 git 工具下载的后续步骤：

1. 进入 git 下载的 `nvm` 目录，该目录中肯定包含 `nvm.sh` 文件，执行 `ls` 命令，能看到以下文件

```text
[test@VM-8-12-centos nvm]# ls
alias               Dockerfile     Makefile      PROJECT_CHARTER.md  test
bash_completion     GOVERNANCE.md  nvm-exec      README.md           update_test_mocks.sh
CODE_OF_CONDUCT.md  install.sh     nvm.sh        rename_test.sh      versions
CONTRIBUTING.md     LICENSE.md     package.json  ROADMAP.md
```

2. 执行 `pwd` 命令查看 nvm 目录的路径
3. 执行下边命令，配置环境变量，注意把下面的路径换成第二步查询的真实路径

```shell
echo "source /xxx/xxx/nvm/nvm.sh" >> ~/.bashrc
```

4. 执行 `source ~/.bashrc` 命令，使配置生效。
5. 使用 `nvm -v` 查看 nvm 版本。 

---

欢迎访问：[天问博客](https://tiven.cn/p/83b2fa23/ "天问博客-专注于大前端技术")

