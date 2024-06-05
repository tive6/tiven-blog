---
title: 使用Crontab和Shell脚本切割Nginx日志
tags:
- Nginx
- Crontab
- Linux
categories:
- Linux / Shell
abbrlink: d8c1da0b
date: 2022-10-09 17:43:31
---

**Nginx** 日志会随着时间和访问流量的增加而日益增大，`access.log` 日志文件也会随之越来越大，最后会导致日志的读写效率下降，进而影响 **Nginx** 服务的性能。因此，需要对 Nginx 日志文件进行切割，本文就介绍一下：**使用 Crontab 定时任务执行 shell 脚本来切割 Nginx 日志。**

![Nginx && Crontab](https://tiven.cn/static/img/img-nginx-03-PjKgeO2EXmC2et_5N5c0l.jpg)

<!-- more -->

## 一、配置 Crontab 定时任务

* 配置文件路径：`/var/spool/cron/root`
* 添加定时任务

```txt
59 23 * * * /root/app/shell/nginx-log-slice.sh
```

配置解释：在 **每天的23时59分** 执行 `/root/app/shell/nginx-log-slice.sh` 脚本。

配置其他自定义时间可以参考：[Linux强大的定时任务-Crontab](https://www.tiven.cn/p/e5a27c6c/ "Linux强大的定时任务-Crontab | 天问博客-专注于大前端技术")，有详细的配置说明。

## 二、编写 shell 脚本

* 文件路径：`/root/app/shell/nginx-log-slice.sh`
* `nginx-log-slice.sh` 完整代码

```sh
#!/bin/bash
. /etc/profile
source /etc/profile
source ~/.bash_profile
PATH=/etc:/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin

# 当发生错误时中止脚本
set -e

base="/usr/local/nginx/logs/"
day="`date '+%Y%m%d'`"
curDir="${base}${day}"
accessLog=${base}access.log
errorLog=${base}error.log
ms="`date '+%s'`"

# 判断以当天日期为名的文件夹是否存在，存在打印输出，不存在就创建
if [ -d ${curDir} ];then
  echo "${curDir} 文件夹存在"
  else
  echo "${curDir} 文件夹不存在"
  mkdir ${curDir}
fi

# 复制当前的 access.log 和 error.log 日志文件，文件名加上时间戳，并存入以当天日期为名的文件夹
\cp -rf ${accessLog} ${curDir}/access-${ms}.log
\cp -rf ${errorLog} ${curDir}/error-${ms}.log

# 复制完成后清空原本的 access.log 和 error.log 日志文件
> ${accessLog}
> ${errorLog}

# 输出成功或失败的信息
if [ $? == 0 ]; then
  echo "nginx slice 成功 (${curDir}/access-${ms}.log)"
  else
  echo "nginx slice 失败 (${curDir}/access-${ms}.log)"
fi
```

## 三、遇到的问题

问题：crontab 定时任务执行 shell 脚本时，可能遇到这种报错：`/bin/sh: /root/app/shell/nginx-log-slice.sh: Permission denied`，这就说明 shell 脚本权限不足。
解决：执行以下命令为 `nginx-log-slice.sh` 文件授权。

```sh
chmod 777 /root/app/shell/nginx-log-slice.sh
```

使用 `ll` 命令查看文件权限

```sh
cd /root/app/shell

ll
```

在授权前会输出：

```txt
[root@VM-8-12-centos shell]# ll
总用量 8
-rwxrwxrwx 1 root root 404 10月 15 2021 test.sh
-rw-r--r-- 1 root root 610 10月  9 2022 nginx-log-slice.sh
```

在授权后会输出：

```txt
[root@VM-8-12-centos shell]# ll
总用量 8
-rwxrwxrwx 1 root root 404 10月 15 2021 test.sh
-rwxrwxrwx 1 root root 610 10月  9 2022 nginx-log-slice.sh
```

一切就绪后建议执行 `nginx -s reload` 重启 Nginx 服务。

---

欢迎访问：[天问博客](https://tiven.cn/p/d8c1da0b/ "天问博客-专注于大前端技术")
