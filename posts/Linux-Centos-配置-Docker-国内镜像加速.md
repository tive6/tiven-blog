---
title: Linux Centos 配置 Docker 国内镜像加速
tags:
  - Linux
  - Docker
categories:
  - Docker / K8s
abbrlink: 495c58bb
date: 2023-12-10 16:00:25
---

在使用 Docker 进行容器化部署时，由于国外的 Docker 镜像源速度较慢，我们可以配置 Docker 使用国内的镜像加速器，以提高下载和部署的效率。本文将介绍如何在 CentOS 系统上配置 Docker 使用国内镜像加速。

![Linux Docker 加速](https://tiven.cn/static/img/docker-01-f3fHmY7L.jpg)

[//]: # (<!-- more -->)

## 步骤一：安装 Docker

首先，我们需要在 CentOS 系统上安装 Docker。可以使用以下命令进行安装：

```bash
sudo yum install -y docker
```

安装完成后，启动 Docker 服务：

```bash
sudo systemctl start docker
```

并设置 Docker 服务开机自启动：

```bash
sudo systemctl enable docker
```

## 步骤二：配置 Docker 镜像加速器

1. 打开 Docker 配置文件 `/etc/docker/daemon.json`：

```bash
sudo vi /etc/docker/daemon.json
```

如果文件不存在，可以创建一个新的文件。

2. 在 `daemon.json` 文件中添加以下内容：

```json
{
  "registry-mirrors": [
    "https://kfwkfulq.mirror.aliyuncs.com",
    "https://2lqq34jg.mirror.aliyuncs.com",
    "https://pee6w651.mirror.aliyuncs.com",
    "https://cr.console.aliyun.com",
    "https://hub-mirror.c.163.com",
    "https://docker.m.daocloud.io"
  ]
}
```

3. 保存并关闭文件。

4. 重启 Docker 服务使配置生效：

```bash
sudo systemctl restart docker
```

## 步骤三：验证配置是否生效

运行以下命令来验证配置是否生效：

```bash
docker info
```

在输出的信息中，查找 `Registry Mirrors` 字段，如果显示了你配置的镜像加速器地址，则表示配置成功。

## 结论

通过配置 Docker 使用国内镜像加速器，我们可以显著提高 Docker 镜像的下载和部署速度，加快容器化应用的部署和开发效率。希望本文对你有所帮助！

参考链接：[Docker 镜像加速器](https://docs.docker.com/registry/recipes/mirror/#use-case-the-china-registry-mirror)


---

欢迎访问：[天问博客](https://tiven.cn/p/495c58bb/ "天问博客-专注于大前端技术")

