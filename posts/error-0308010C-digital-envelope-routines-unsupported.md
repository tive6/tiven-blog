---
title: 'vue-cli-service serve报错：error:0308010C:digital envelope routines::unsupported'
tags:
- Node
- npm
categories:
- Node
abbrlink: fd5c1da4
date: 2022-10-03 15:37:24
#top: 9
---

升级 **node** 版本到 `v18.3.0` 后，执行 `npm run dev` 启动 `vue-cli-service` 本地开发服务报错：`Error: error:0308010C:digital envelope routines::unsupported`。

![Node](https://tiven.cn/static/img/img-nginx-05-Y58_6Hc75vBxrWs81rObq.jpg)

<!-- more -->

## 一、完整报错信息

```txt
D:\project\data-web>npm run dev

> datalk@1.0.0 dev
> vue-cli-service serve --mode dev

 INFO  Starting development server...
10% building 2/2 modules 0 activeError: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\util\createHash.js:135:53)
    at NormalModule._initBuildHash (D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\NormalModule.js:417:16)
    at handleParseError (D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\NormalModule.js:471:10)
    at D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\NormalModule.js:503:5
    at D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\NormalModule.js:358:12
    at D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:373:3
    at iterateNormalLoaders (D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:214:10)
    at iterateNormalLoaders (D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:221:10)
    at D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:236:3
    at runSyncOrAsync (D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:130:11)
    at iterateNormalLoaders (D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:232:2)
    at Array.<anonymous> (D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:205:4)
    at Storage.finished (D:\project\datalk-web\node_modules\_enhanced-resolve@4.5.0@enhanced-resolve\lib\CachedInputFileSystem.js:55:16)
    at D:\project\datalk-web\node_modules\_enhanced-resolve@4.5.0@enhanced-resolve\lib\CachedInputFileSystem.js:91:9
10% building 2/5 modules 3 active D:\project\datalk-web\node_modules\_webpack-dev-server@3.11.3@webpack-dev-server\client\index.js?http://0.0.0.0:80node:internal/crypto/hash:67
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\util\createHash.js:135:53)
    at NormalModule._initBuildHash (D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\NormalModule.js:417:16)
    at handleParseError (D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\NormalModule.js:471:10)
    at D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\NormalModule.js:503:5
    at D:\project\datalk-web\node_modules\_webpack@4.46.0@webpack\lib\NormalModule.js:358:12
    at D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:373:3
    at iterateNormalLoaders (D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:214:10)
    at Array.<anonymous> (D:\project\datalk-web\node_modules\_loader-runner@2.4.0@loader-runner\lib\LoaderRunner.js:205:4)
    at Storage.finished (D:\project\datalk-web\node_modules\_enhanced-resolve@4.5.0@enhanced-resolve\lib\CachedInputFileSystem.js:55:16)
    at D:\project\datalk-web\node_modules\_enhanced-resolve@4.5.0@enhanced-resolve\lib\CachedInputFileSystem.js:91:9
    at D:\project\datalk-web\node_modules\_graceful-fs@4.2.10@graceful-fs\graceful-fs.js:123:16
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v18.3.0
```

## 二、解决办法

需要设置环境变量来解决

1. Windows

```sh
set NODE_OPTIONS=--openssl-legacy-provider
```

2. Linux / Mac

```sh
export NODE_OPTIONS=--openssl-legacy-provider
```

完成后，建议重开一个命令行窗口启动服务。

---

欢迎访问：[天问博客](https://tiven.cn/p/fd5c1da4/ "天问博客-专注于大前端技术")

