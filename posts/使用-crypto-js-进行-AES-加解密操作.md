---
title: 使用 crypto-js 进行 AES 加解密操作
tags:
  - Node
  - crypto-js
  - AES
categories:
  - JavaScript
abbrlink: a7a370ca
date: 2024-01-16 17:06:42
---

在前端开发中，数据的加密和解密是为了保障用户隐私和数据的安全性而常见的任务。**AES**（Advanced Encryption Standard）是一种对称密钥加密算法，被广泛用于保护敏感信息的传输和存储。本文将介绍 **AES** 加解密的基本原理，并结合 `Crypto-JS` 库提供的实例代码进行说明。

![crypto-js AES](https://tiven.cn/static/img/aes-02-_vheyWS1.jpg)

[//]: # (<!-- more -->)

## 一、AES 简介

`AES` 是一种块加密算法，它以固定大小的块（128位）处理数据，并支持不同密钥长度（128、192、256位）。由于其高度的安全性和效率，`AES` 已成为许多安全应用的首选算法。

### 加密过程

1. **初始轮（Initial Round）：** 将明文与第一轮密钥进行异或运算。
2. **多轮加密（Rounds）：** 将初始轮的结果经过多轮的重复处理。每一轮都包括四个步骤：SubBytes、ShiftRows、MixColumns、AddRoundKey。
3. **最终轮（Final Round）：** 在最后一轮中，省略 MixColumns 步骤，只进行 SubBytes、ShiftRows 和 AddRoundKey。

### 解密过程

解密过程与加密过程相似，但是顺序相反，且在每一轮中使用的密钥是加密时的逆操作。最终得到解密后的明文。

## 二、Crypto-JS 介绍

`Crypto-JS` 是一个开源的 JavaScript 加密库，它提供了常见的加解密算法，包括 `AES`、`DES`、`Rabbit`、`RC4`、`MD5`、`PBKDF2`、`HMAC`、`SHA1`、`SHA256`、`SHA3`、`Rabbit`、`Rabbit-OAEP`、`ECIES` 等。本文将使用 `Crypto-JS` 提供的 `AES` 算法进行加解密操作。

## 三、Crypto-JS AES 加解密操作

### 1. 引入Crypto-JS库

首先，确保你的项目中已经引入了 `crypto-js` 库。在本例中，我们使用了AES加解密算法，因此需要引入相应的模块：

```javascript
import AES from 'crypto-js/aes'
import enc from 'crypto-js/enc-utf8'
import ECB from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'
// import MD5 from 'crypto-js/md5'
```

### 2. 设置密钥和常量

在加解密过程中，**密钥** 是一个关键的参数。我们需要定义密钥，以便后续的加解密操作。

```javascript
// import { SecretKey } from '@/common/consts.js'
// 设置密钥
const SecretKey = 'your secret key'
// 获取密钥对应的byte数组
const keyBytes = enc.parse(SecretKey)
```

### 3. 解密操作

下面是解密操作的代码示例，其中包括了设置加解密模式和填充方式：

```javascript
export function decode(str = '') {
  try {
    const decryptedBytes = AES.decrypt(str, keyBytes, {
      mode: ECB, // 加解密模式
      padding: Pkcs7, // 填充方式
    })
    return decryptedBytes.toString(enc)
  } catch (err) {
    console.log(err)
    return ''
  }
}
```

### 4. 加密操作

同样，以下是加密操作的代码示例，也包括了设置加解密模式和填充方式：

```javascript
export function encode(str = '') {
  try {
    const encryptedBytes = AES.encrypt(str, keyBytes, {
      mode: ECB, // 加解密模式
      padding: Pkcs7, // 填充方式
    })
    return encryptedBytes.toString()
  } catch (err) {
    console.log(err)
    return ''
  }
}
```

通过以上步骤，我们就完成了使用 Crypto-JS 进行 AES 加解密操作的实例。这些代码可以轻松地集成到你的前端项目中，以保障敏感信息的安全传输和存储。希望这个实例能够帮助你更好地理解前端加密操作的过程。

参考文档：

- [Crypto-JS 官方文档](https://cryptojs.gitbook.io/docs/)
- [Crypto-JS npm](https://www.npmjs.com/package/crypto-js)

---

欢迎访问：[天问博客](https://tiven.cn/p/a7a370ca/ "天问博客-专注于大前端技术")

