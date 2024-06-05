---
title: Docker 常用命令
tags:
  - Linux
  - Docker
categories:
  - Docker / K8s
abbrlink: f1efb8a3
date: 2023-12-18 14:05:40
---

**Docker** 是一种流行的容器化平台，它可以帮助开发人员和运维团队更轻松地构建、部署和管理应用程序。在本篇博客中，我将介绍一些常用的 **Docker** 命令，以帮助您开始使用 **Docker**。

![Docker](https://tiven.cn/static/img/docker-01-f3fHmY7L.jpg)

[//]: # (<!-- more -->)

## 一、安装 Docker

在使用 **Docker** 命令之前，您需要先安装 Docker。您可以根据您的操作系统类型，选择适合的 Docker 安装方式。以下是一些常见操作系统的安装方式：

- **Ubuntu**:

```shell
$ sudo apt-get update
$ sudo apt-get install docker.io
```

- **CentOS**:

```shell
$ sudo yum update
$ sudo yum install docker
```

- **MacOS 和 Window**: 您可以从 **Docker** 官方网站下载 `Docker Desktop` 并按照安装向导进行安装。

## 二、基本命令

以下是一些常用的 Docker 命令：

- **docker version**: 查看 Docker 版本信息。
- **docker info**: 查看 Docker 系统信息，包括容器、镜像和存储等。
- **docker run \<image\>**: 运行一个容器，其中 `<image>` 是要运行的镜像名称。
- **docker ps**: 列出正在运行的容器。
- **docker images**: 列出本地的镜像。
- **docker pull \<image\>**: 从 Docker 镜像仓库中拉取一个镜像到本地。
- **docker stop \<container\>**: 停止一个正在运行的容器，其中 `<container>` 是容器的名称或 ID。
- **docker rm \<container\>**: 删除一个已停止的容器，其中 `<container>` 是容器的名称或 ID。
- **docker rmi \<image\>**: 删除一个本地的镜像，其中 `<image>` 是镜像的名称或 ID。

## 三、构建镜像

使用 Docker，您可以构建自己的镜像来定制化应用程序的运行环境。以下是构建镜像的基本步骤：

1. 在一个空白目录下创建一个名为 `Dockerfile` 的文件。
2. 在 `Dockerfile` 中定义镜像的配置和操作指令，例如安装软件、拷贝文件等。
3. 使用 `docker build` 命令构建镜像，例如：

```shell
$ docker build -t myapp:1.0 .
```
   
4. 其中 `-t` 参数指定了镜像的名称和标签，`.` 表示当前目录。

## 四、运行容器

使用 Docker，您可以轻松地运行容器来部署应用程序。以下是运行容器的基本步骤：

1. 使用 `docker run` 命令运行一个容器，如下：

```shell
$ docker run -d -p 8080:80 myapp:1.0
```

2. 其中 `-d` 参数表示在后台运行容器，`-p` 参数指定了容器端口与主机端口的映射关系。
3. 访问 `http://localhost:8080` 即可查看运行在容器中的应用程序。

## 五、总结

本篇博客介绍了一些常用的 Docker 命令，包括安装 Docker、基本命令、构建镜像和运行容器等。通过学习这些命令，您可以更好地使用 Docker 来管理和部署应用程序。希望这篇博客对您有所帮助！

参考资料：
- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)

---

欢迎访问：[天问博客](https://tiven.cn/p/f1efb8a3/ "天问博客-专注于大前端技术")

