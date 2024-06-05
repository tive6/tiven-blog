---
title: Rust语言学习 · Hello World
abbrlink: 8374204
date: 2022-01-19 17:59:28
tags:
- Rust
categories:
- Rust / Python
---

每学习一门新语言，基本都是从 `Hello World` 问候世界开始的，所以学习Rust也不例外。

![Rust](https://tiven.cn/static/img/img-rust-02-K7NN1qtVA_XEn01hb5GiH.jpg)

<!-- more -->

## Cargo介绍

`Cargo` 是 `Rust` 的构建系统和包管理器。就相当于 `Node` 中的 `Npm`。 `Rust` 开发者常用 `Cargo` 来管理 `Rust` 工程和获取工程所依赖的库。

**Cargo 功能：**

1. 创建（new）工程：
   * 生成新的工程目录：`cargo new app-name`
   * 当前文件目录初始化工程：`cargo init` 
2. 构建（build）工程：`cargo build`
3. 运行（run）工程：`cargo run`

## 创建Hello工程

1. 新建工程

```shell
# 创建工程
cargo new hello_world

# 进入工程
cd hello_world
```

2. 工程目录结构

```txt
/hello_world
    /src
        /main.rs
    .gitignore
    Cargo.lock
    Cargo.toml
```

3. 编辑 `main.rs` 文件：

```rust
//  src/main.rs

fn main() {
    // Hello World
    println!("=========== Hello World ===========");
    let str = "Hello World !";
    println!("{}", str);

    // 打印多个值
    println!("=========== 打印多个值 ===========");
    let a = "Hello World !";
    let b = "Hello Rust !";
    println!("{} {}", a, b);

    // 多次输出同一个值
    println!("=========== 多次输出同一个值 ===========");
    let c = "CC";
    println!("c is {}, c again is {}", c, c);
    println!("c is {0}, c again is {0}", c);

    // 打印 {}
    println!("=========== 打印 {{}} ===========");
    println!("{{}}");

    println!("=========== end ===========");
}
```

4. 运行工程

```shell
cargo run 
```

输出：

```txt
E:\rust\hello_world>cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.01s
     Running `target\debug\hello_world.exe`
=========== Hello World ===========
Hello World !
=========== 打印多个值 ===========
Hello World ! Hello Rust !
=========== 多次输出同一个值 ===========
c is CC, c again is CC
c is CC, c again is CC
=========== 打印 {} ===========
{}
=========== end ===========

```

至此`Rust`入门， 成功打印 `Hello World` 问候世界！

---

欢迎访问：[天问博客](https://tiven.cn/p/8374204/ "天問博客")
