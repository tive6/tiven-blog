---
title: WebAssembly是什么？
abbrlink: 2aa253dd
date: 2021-12-02 17:16:08
tags:
- Web
- Wasm
categories:
- 大前端
---

`WebAssembly`（简称：`wasm`） 是一个可移植、体积小、加载快并且兼容 Web 的全新的`二进制指令`格式，它可以运行在适用于`堆栈`的虚拟机上。

![WebAssembly](https://tiven.cn/static/img/img-wasm-01-GoOd3QXhfcZDXrtMLpPKf.jpg)

<!-- more -->

## 一、特性

* **高效：** `wasm` 有一套完整的语义，实际上 `wasm` 是体积小且加载快的`二进制`格式， 其目标就是充分发挥硬件能力以达到`原生`执行效率。
* **安全：** `wasm` 运行在一个`沙箱化`的执行环境中，甚至可以在现有的 `JavaScript` 虚拟机中实现。在web环境中，`WebAssembly` 将会严格遵守`同源策略`以及浏览器安全策略。
* **开放：** `wasm` 设计了一个非常规整的文本格式用来、调试、测试、实验、优化、学习、教学或者编写程序。可以以这种文本格式在web页面上查看`wasm`模块的源码。
* **标准：** `wasm` 在 web 中被设计成无版本、特性可测试、向后兼容的。`WebAssembly` 可以被 `JavaScript` 调用，进入 `JavaScript` 上下文，也可以像 Web API 一样调用浏览器的功能。当然，`WebAssembly` 不仅可以运行在浏览器上，也可以运行在非web环境下。


## 二、WebAssembly的由来

1. JavaScript解释型编程语言的性能瓶颈
2. Javascript强制静态类型严格子集`asm.js`（`WebAssembly`的前身）的出现

## 三、使用场景

适用于计算密集型的项目，如：

* 虚拟机: TeaVM
* 3D和图形: Figma, AutoCAD, Google Earth
* 游戏引擎: Unity, Unreal
* 音视频处理: Web-DSP

## 四、开发工具

* **AssemblyScript：** 支持直接将 `TypeScript` 编译成 `WebAssembly`。这对于很多前端同学来说，入门的门槛还是很低的。[地址](https://github.com/AssemblyScript/assemblyscript "AssemblyScript")
* **Emscripten：** 可以说是 `WebAssembly` 的灵魂工具不为过，上面说了很多编译，这个就是那个编译器。将其他的高级语言，编译成 `WebAssembly`。[地址](https://github.com/kripken/emscripten "Emscripten")
* **WABT：** 是个将 `WebAssembly` 在字节码和文本格式相互转换的一个工具，方便开发者去理解这个 `wasm` 到底是在做什么事。[地址](https://github.com/WebAssembly/wabt "WABT")
* **wast/wat：** 由于wasm是二进制文件，不便于阅读和调试，Wast是文本形式，通过工具wast2wasm可以编译生成`wasm`。


---

欢迎访问：[天问博客](https://tiven.cn/p/2aa253dd/ "天問博客")
