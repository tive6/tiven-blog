---
title: Mac 配置自建证书
tags:
- Node
- Electron
- Mac
categories:
- Electron / Tauri
abbrlink: a9892474
date: 2023-07-04 16:30:05
---

在 Mac 系统下开发 `electron` 桌面应用，打包时需要配置签名证书。本文就介绍一下 Mac 中如何生成自建证书。

![Mac 钥匙串](https://tiven.cn/static/img/img-mac-sign-01-OhU5lHm-6jWq-EqHNti2K.jpg)

[//]: # (<!-- more -->)

## 自建证书步骤

1. 打开 `钥匙串` 应用。
2. **钥匙串访问** > **证书助理** > **创建证书**，如上图所示。
3. 输入证书名称，选择 **代码签名** 。

![Mac 创建证书](https://tiven.cn/static/img/img-mac-sign-02-tKyE5w_3nSR_XIPx-tQNZ.jpg)

4. 在 **我的证书** 中找到刚才创建的证书，双击打开，选择 **始终信任** ，保存。

![Mac 始终信任证书](https://tiven.cn/static/img/img-mac-sign-03-1_pssfF5vkqx-_LRdo2eq.jpg)

5. 用户名、密码认证。


---

欢迎访问：[天问博客](https://tiven.cn/p/a9892474/ "天问博客-专注于大前端技术")

