---
title: Solidity 解决 SPDX license identifier not provided in source file 问题
tags:
- Solidity
categories:
- 大前端
abbrlink: d471e980
date: 2022-12-02 14:18:39
---

使用 `solcjs` 编译 **solidity** 文件，出现 `Warning: SPDX license identifier not provided in source file` 日志，导致 sol 文件编译失败。

![Solidity](https://tiven.cn/static/img/img-solidity-01-HVk-cTNq-RhhVUHNNiEB7.jpg)

[//]: # (<!-- more -->)

## 一、完整日志

```txt
PS D:\project\solidity> solcjs -o dist --bin .\01.sol
Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-
open-source code. Please see https://spdx.org for more information.
--> 01.sol
```

## 二、警告原因

`soliidity` **0.6.8** 引入了 `SPDX` ，使用时要在 `.sol` 文件第一句加上 `SPDX-License-Identifier: <SPDX-License>` 注释。

## 三、解决

在 `.sol` 文件第一句加上 `// SPDX-License-Identifier: GPL-3.0`，如下：

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    uint storedData = 567;
    bool isOk = true;

    int256 a = 20;
    int256 b = 30;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }

    function getAddr() public view returns (address) {
        return msg.sender;
    }

    function getBool() public view returns (bool ) {
        return isOk;
    }

    function add() public view returns (int) {
        if (a > b) {
            return a - b;
        } else {
            return a + b;   
        }

    }
}
```

`SPDX` 许可列表网址：[https://spdx.org/licenses/](SPDX许可列表网址：https://spdx.org/licenses/ "SPDX许可")

---

欢迎访问：[天问博客](https://tiven.cn/p/d471e980/ "天问博客-专注于大前端技术")

