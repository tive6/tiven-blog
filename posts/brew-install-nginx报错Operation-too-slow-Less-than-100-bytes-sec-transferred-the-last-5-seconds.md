---
title: brew install nginx报错Operation too slow. Less than 100 bytes/sec transferred the last 5 seconds
tags:
- Nginx
- Mac
- brew
categories:
- Git / Brew
abbrlink: 3619c274
date: 2023-04-14 10:44:04
---

使用 **brew** 安装 **nginx** 时报错：`brew install nginx报错Operation too slow. Less than 100 bytes/sec transferred the last 5 seconds`。

![brew install nginx](https://tiven.cn/static/img/img-shell-02-evtTjyGQiSI_3NqvVhdjy.jpg)

<!-- more -->

## 完整报错信息

```text
tiven@bogon% brew install nginx
==> Downloading https://formulae.brew.sh/api/formula.jws.json
brew update-=O=-            #     #    #     #                                  brew update-=O=-          #     #    #     #                                    brew update-=O=-       #   #     #    #                                         curl: (28) Operation too slow. Less than 100 bytes/sec transferred the last 5 seconds

Error: Failure while executing; `/usr/bin/env /opt/homebrew/Library/Homebrew/shims/shared/curl --disable --cookie /dev/null --globoff --user-agent Homebrew/4.0.13\ \(Macintosh\;\ arm64\ Mac\ OS\ X\ 13.2.1\)\ curl/7.86.0 --header Accept-Language:\ en --fail --progress-bar --location --remote-time --output /Users/tiven/Library/Caches/Homebrew/api/formula.jws.json --compressed --speed-limit 100 --speed-time 5 --progress-bar https://formulae.brew.sh/api/formula.jws.json` exited with 28. Here's the output:
curl: (28) Operation too slow. Less than 100 bytes/sec transferred the last 5 seconds
```

## 解决办法

在终端执行：

```bash
export HOMEBREW_NO_INSTALL_FROM_API=1
```

## 参考文档

* [curl: (28) Operation timed out #14451](https://github.com/Homebrew/brew/issues/14451 "Homebrew/brew Issues")

---

欢迎访问：[天问博客](https://tiven.cn/p/3619c274/ "天问博客-专注于大前端技术")

