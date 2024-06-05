---
title: CentOS服务器之间免密登录和传输文件
tags:
- Linux
- Zip
categories:
- Linux / Shell
abbrlink: 7706aad4
date: 2023-08-15 15:47:26
---

使用过 **Jenkins** 的同学都知道，Jenkins 会在远程服务器上执行一些命令，如：`cd /home/wwwroot/ && git pull`，这时候就需要在 Jenkins 服务器上配置免密登录，以及在远程服务器上配置免密登录，这样才能实现 Jenkins 服务器和远程服务器之间的静默文件传输、执行脚本发版等操作。

![CentOS](https://tiven.cn/static/img/img-linux-02-T5XKKrMZDxYZDUAwloGVI.jpg)

<!-- more -->

## 一、场景需要

* 服务器A：CentOS_168,假如IP为：1.1.1.1
* 服务器B：CentOS_192，假如IP为：2.2.2.2 

**要求实现:** CentOS_168 向 CentOS_192 通过ssh免密登陆、scp传输文件

## 二、操作步骤

### 2.1、登陆服务器A，执行命令生成密钥对

1). 生成秘钥

```shell
ssh-keygen
```

该命令一直按回车（Enter）即可，默认生成位置一般是：**~/.ssh/**
如果用户是非 **root** 一般位置是：**/home/你的当前用户名/.ssh/**

```shell
# 进入当前用户的根目录
cd ~
# 查看隐藏文件
ll -a
# or
ls -a
```

2). 进入该路径

```shell
cd ~/.ssh/
```

### 2.2、下载生成的公钥文件：`id_rsa.pub`

找到 `id_rsa.pub` 这个文件，现将这个文件下载到本地

```shell
sz id_rsa.pub
```

### 2.3、登陆服务器B

1). 登陆服务器B，进入 `/root/.ssh` 目录，如果没有该目录，就创建一个

```shell
cd /root/.ssh

# or
mkdir /root/.ssh
```    

2). 上传步骤2.2下载到本地的 `id_rsa.pub` 文件到服务器B的 `/root/.ssh` 目录下

```shell
rz
```

3). 在服务器B的 `/root/.ssh` 目录下创建一个 `authorized_keys` 文件

```shell
touch authorized_keys
```

此时该目录下应该有 `id_rsa.pub` 和 `authorized_keys` 两个文件

4). 将公钥文件 `id_rsa.pub` 追加到 `authorized_keys` 文件中

```shell
cat id_rsa.pub >> authorized_keys
```

**注意：** 尽量不要复制粘贴 `id_rsa.pub` 的内容，因为有可能会出现乱码，导致免密登录失败。建议使用 `cat` 命令追加到 `authorized_keys` 文件中。

## 三、测试

登录服务器A，以下命令都是在服务器A中执行。

1. 免密登录，如果能够免密登录服务器B，则表示配置成功。

```shell
ssh root@2.2.2.2
```

2. 免密传输文件

```shell
# 新建一个测试文件
touch /root/test.txt

# 传输文件
scp /root/test.txt root@2.2.2.2:/root/test.txt
# 可以修改文件名
scp /root/test.txt root@2.2.2.2:/root/01.txt
```

3. 免密执行命令

```shell
ssh root@2.2.2.2 "nginx -t"
# 执行脚本
ssh root@2.2.2.2 "sh /root/01.sh"
```

---

欢迎访问：[天问博客](https://tiven.cn/p/7706aad4/ "天问博客-专注于大前端技术")

