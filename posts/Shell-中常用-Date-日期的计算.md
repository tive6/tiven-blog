---
title: Shell 中常用 Date 日期的计算
tags:
- Shell
- Linux
categories:
- Linux / Shell
abbrlink: 4269c9aa
date: 2022-11-15 11:46:36
---

在使用 **Crontab** 定时任务和 **Shell** 脚本切割 **Nginx** 日志文件时，要用到时间戳、当月、上月、下月、上月初、上月末、下月初、下月末等等，其中有些日期不能直接获取，需要经过一定的计算才能得到。

![Shell Date](https://tiven.cn/static/img/img-shell-02-evtTjyGQiSI_3NqvVhdjy.jpg)

<!-- more -->

## 一、Date 基础格式化

|格式|输出|含义|
|---|---|---|
|date|2022年 11月 15日 星期二 19:10:21 CST|当前日期和时间|
|date +%Y|2022|年|
|date +%y|22|年|
|date +%m|11|月|
|date +%d|15|日|
|date +%D|11/15/22|当前日期|
|date +%Y%m%d|20221115|当前日期|
|date +%F|2022-11-15|当前日期|
|date +%H|19|时|
|date +%M|20|分|
|date +%S|30|秒|
|date +%s|1668511253|时间戳|
|date +%T|19:21:26|时分秒|
|date +%H:%M:%S|19:21:26|时分秒|
|date +%w|2|今天是周二|
|date +%W|46|今年的第46周|
|cal|(当月日历)|当月日历|

## 二、Date 日期计算

> 当前日期：2022-11-15

* 前一天 

```sh
date -d "-1 day"
# 2022年 11月 14日 星期一 19:34:01 CST

date -d "-1 day" +%F
# 2022-11-14

date -d "last day" +%F
# 2022-11-14
```

* 前三天

```sh
date -d "-3 day" +%F
# 2022-11-12
```

* 后一天

```sh
date -d "1 day" +%F
# 2022-11-16

date -d "next day" +%F
# 2022-11-16
```

* 上一月

```sh
date -d "-1 month" +%F
# 2022-10-15

date -d "last month" +%Y%m
# 202210
```

* 下一月

```sh
date -d "1 month" +%F
# 2022-12-15

date -d "next month" +%Y-%m
# 2022-12
```

* 上一年

```sh
date -d "-1 years" +%F
# 2021-11-15

date -d "last year" +%Y%m
# 202111
```

* 时间戳转日期

```sh
date -d @1621563928
# 2021年 05月 21日 星期五 10:25:28 CST
```

* 日期转时间戳

```sh
date +%s -d "2022-10-21 10:38:48"
# 1666319928
```

* 当月末日期和当月天数：先获取下个月第一天，减去一天

```sh
nextMonthStart=`date -d "${date} +1 month" "+%Y%m01"`
currMonthEnd=`date -d "${nextMonthStart} -1 day" "+%F"`
currMonthDays=`date -d "${nextMonthStart} -1 day" "+%d"`
echo $currMonthEnd
# 2022-11-30

echo currMonthDays
# 30
```

---

欢迎访问：[天问博客](https://tiven.cn/p/4269c9aa/ "天问博客-专注于大前端技术")

