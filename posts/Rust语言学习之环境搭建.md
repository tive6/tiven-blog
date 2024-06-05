---
title: Rust语言学习 · 环境搭建
abbrlink: b3ba8621
date: 2022-01-18 15:51:15
tags:
- Rust
categories:
- Rust / Python
---

每个语言都有自己的开发、运行、编译环境，所以要想学好Rust，搭建环境肯定是第一步。

![Rust](https://tiven.cn/static/img/img-rust-02-K7NN1qtVA_XEn01hb5GiH.jpg)

[//]: # (<!-- more -->)

## 安装IDE

`Rust` 支持很多的集成开发环境（IDE）或开发专用的文本编辑器。
官方网站公布支持的工具: [详见](https://www.rust-lang.org/zh-CN/tools "Rust IDE Tools")。

**推荐：** `VS Code`、`Atom`。需要安装对应的rust插件，提供了比较友好的提示信息和代码补全功能。

## 安装 Rust 编译工具

**提示：** Rust 的编译工具依赖 `C` 语言的编译工具，所以需要安装 `C` 语言的编译环境。`Windows` 操作系统推荐安装 `MinGW + GCC` 编译环境。

1. 下载 `rustup-init.exe`
   - 官网地址：[rustup-init](https://www.rust-lang.org/zh-CN/tools/install "rustup-init.exe")
   - 百度云地址： [链接](https://pan.baidu.com/s/1kMb5CuPuNnYzOzEiMGUCkQ "rustup-init.exe") 提取码：rsn5
2. 双击执行 `rustup-init.exe` 文件，会出现以下弹框：
   ![Rustup Install](https://tiven.cn/static/img/img-rust-install-01-oGjSjqHxaGaEu9p_Bs5RL.jpg)
3. 然后一路回车，等待安装完成。出现下图所示说明安装完成了。
   ![Rustup Install](https://tiven.cn/static/img/img-rust-install-02-pB7TGrH3G5mHIfnSOMlF3.jpg)
4. 测试
```shell
rustc -V
```
- 输出：
```txt
E:\dev>rustc -V
rustc 1.58.0 (02072b482 2022-01-11)
```

至此说明`Rust`环境已经搭建成功，可以愉快的使用`rust`了。

---

欢迎访问：[天问博客](https://tiven.cn/p/b3ba8621/ "天問博客")
