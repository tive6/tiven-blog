---
title: 'egg-mysql连接报错:ER_NOT_SUPPORTED_AUTH_MODE'
tags:
- Egg.js
- Node
- MySQL
categories:
- Egg.js
abbrlink: 7291c5ec
date: 2022-03-18 12:45:23
---

使用 `egg-mysql` 连接 `MySQL` 数据库时报错：`nodejs.ER_NOT_SUPPORTED_AUTH_MODEError: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client` 。

![egg-mysql](https://tiven.cn/static/img/img-mysql-01-qhgrxcLM0m13IzfuSRqE3.jpg)

[//]: # (<!-- more -->)

## 一、报错原因

使用 `egg-mysql` 中间件连接数据库 `MySQL8.0`，MySQL8.0 之前的版本中加密规则是 `mysql_native_password` ，而 MySQL8.0，加密规则是 `caching_sha2_password` 。

## 二、解决办法

将加密规则还原成 `mysql_native_password` 。使用 mysql 命令行进行操作，步骤如下：

1. 以管理员身份启动 mysql 服务

```shell
net start mysql
```

2. 登录 mysql 命令行模式

```shell
# 用户名 root

mysql -uroot -p

# 回车输入密码
```

3. 使用 mysql 命令修改加密规则

```shell
alter user 'root'@'localhost' identified with mysql_native_password by '123456';

# 用户名 root
# 本地服务 localhost
# 密码 123456
```

**提示：** 用户名、本地服务和密码根据自己的设置进行替换即可，需要加 **单引号** ，最后结束要加 `;` 。

4. eg：

```txt
mysql> alter user 'root'@'localhost' identified with mysql_native_password by '123456';
Query OK, 0 rows affected (0.01 sec)
```

5. 输出 `Query OK, 0 rows affected (0.01 sec)` 说明已经设置成功。

---

欢迎访问：[天问博客](https://tiven.cn/p/7291c5ec/ "天问博客")



