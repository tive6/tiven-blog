---
title: brew 安装使用 mysql、redis、mongodb
tags:
- brew
- Mac
- DB
categories:
- Git / Brew
abbrlink: f79bbf88
date: 2023-08-06 15:06:49
---

在 Mac 生态中 brew 真是个万能神器，今天就来介绍一下怎么使用 **brew** 安装 **mysql**、**redis**、**mongodb**，以及如何使用 **brew** 启动、关闭、重启这些服务。

![数据库](https://tiven.cn/static/img/mysql-01-AV-dk7Hz.jpg)

<!-- more -->

## 前言

brew 常用命令

```sh
# 查看brew的版本
brew -v

# 更新homebrew自己，把所有的Formula目录更新，并且会对本机已经安装并有更新的软件用*标明
brew update

# 安装
brew install [包名]@版本

# 卸载
brew uninstall [包名]

# 查询本机已安装的包
brew list

# 查询包信息
brew info [包名]

# 查询本地启动的服务
brew services list

# 搜索包名称和相关软件
brew search [包名]
```

## 一、MySQL 安装与使用

### 1.1 安装

```sh
brew install mysql
```

### 1.2 使用

```sh
# 启动服务
brew services start mysql

# 停止服务
brew services stop mysql

# 配置
mysql_secure_installation

# 终端登陆 (输入密码)
mysql -uroot -p
mysql -uroot -proot xxxx
```

## 二、Redis 安装与使用

### 2.1 安装

```sh
brew install redis
```

### 2.2 使用

```sh
# 启动服务
brew services start redis

# 停止服务
brew services stop redis

# 查看redis基本信息
redis-server

# 查看redis是否正在运行
ps axu | grep redis

# redis-cli连接redis服务,redis默认端口号6379，默认auth为空
redis-cli -h 127.0.0.1 -p 6379 -a 密码

# 或直接输入redis-cli，默认会链接本地的redis服务
redis-cli

# 试试执行ping命令，看看redis服务是否有回应，回应pong则正常
ping

# 验证密码对不对
AUTH 密码

# 关闭redis服务
redis-cli shutdown

# 强行终止redis
sudo pkill redis-server
```

## 三、MongoDB 安装与使用

### 3.1 安装

```sh
brew tap mongodb/brew
brew install mongodb-community
```

### 3.2 使用

```sh
# 启动服务
brew services start mongodb-community

# 停止服务
brew services stop mongodb-community

# 查看mongodb基本信息
mongod --version

# 查看mongodb是否正在运行
ps axu | grep mongod

# 终端连接mongodb服务
mongosh
```

---

欢迎访问：[天问博客](https://tiven.cn/p/f79bbf88/ "天问博客-专注于大前端技术")

