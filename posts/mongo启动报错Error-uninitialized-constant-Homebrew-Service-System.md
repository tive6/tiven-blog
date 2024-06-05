---
title: 'mongo启动报错Error: uninitialized constant Homebrew::Service::System'
tags:
- brew
- Mac
- MongoDB
categories:
- Git / Brew
abbrlink: ae4f47d7
date: 2023-08-05 11:31:16
---

在 Mac M1 系统上安装 MongoDB，启动报错：`Error: uninitialized constant Homebrew::Service::System`。

![Brew & MongoDB](https://tiven.cn/static/img/mongo-03-i1uadFKe.jpg)

[//]: # (<!-- more -->)

## 问题复现

1. `brew tap mongodb/brew`
1. 使用 `brew install mongodb-community` (`6.0.6`) 安装 **MongoDB**，安装成功
2. 使用 `brew services start mongodb-community` 启动 **MongoDB**，完整报错如下：

```js
tiven@bogon ~ % brew services stop mongodb-community    
Error: uninitialized constant Homebrew::Service::System
/opt/homebrew/Library/Homebrew/macos_version.rb:150:in `const_missing'
/opt/homebrew/Library/Taps/homebrew/homebrew-services/cmd/services.rb:61:in `services'
/opt/homebrew/Library/Homebrew/brew.rb:94:in `<main>'
```

## 解决方案

1. `cd /opt/homebrew/Library/Taps/homebrew` 
2. `rm -rf ./homebrew-services`
3. `brew tap homebrew/services`

再次使用 `brew services start mongodb-community` 启动 **MongoDB** 就正常了。

```js
# 启动
tiven@bogon homebrew % brew services start mongodb-community  
==> Successfully started `mongodb-community` (label: homebrew.mxcl.mongodb-commu

# 停止
tiven@bogon homebrew % brew services stop mongodb-community
```

---

欢迎访问：[天问博客](https://tiven.cn/p/ae4f47d7/ "天问博客-专注于大前端技术")

