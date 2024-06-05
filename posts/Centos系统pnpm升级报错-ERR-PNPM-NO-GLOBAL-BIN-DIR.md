---
title: Centos系统pnpm升级报错 ERR_PNPM_NO_GLOBAL_BIN_DIR
tags:
- pnpm
- Linux
categories:
- pnpm / npm / yarn
abbrlink: 42e4215e
date: 2023-08-01 19:06:58
---

在 **CentOS** 系统中使用 `pnpm i -g pnpm` 报错：`ERR_PNPM_NO_GLOBAL_BIN_DIR Unable to find the global bin directory`，折腾半天终于解决了。

![CentOS && pnpm](https://tiven.cn/static/img/img-pnpm-01-uuy8Ng5U-8RCd9KU396Kj.jpg)

[//]: # (<!-- more -->)

## 完整报错信息

```js
[root@VM-8 test]# pnpm i -g pnpm
Nothing to stop. No server is running for the store at /root/.local/share/pnpm/store/v3
ERR_PNPM_NO_GLOBAL_BIN_DIR Unable to find the global bin directory

Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.
```

按照给出的提示运行 `pnpm setup`，再次执行 `pnpm i -g pnpm` 发现还是出现以上报错。
最后才明白执行 `pnpm setup` 其实是在环境变量中添加了一些 **pnpm** 的配置，虽然去查看环境变量已存在，但是并没有生效。
因为缺少了一个重要步骤，那就是 `source ~/.bashrc`，这样才能使环境变量生效。

## 总结

出现这种报错：`ERR_PNPM_NO_GLOBAL_BIN_DIR Unable to find the global bin directory`，执行以下两个命令就可以解决：

```shell
pnpm setup

# CentOS 系统
source ~/.bashrc

# MacOS 系统
source ~/.zshrc
```

---

欢迎访问：[天问博客](https://tiven.cn/p/42e4215e/ "天问博客-专注于大前端技术")

