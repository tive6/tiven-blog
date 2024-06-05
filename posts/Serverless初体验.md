---
title: Serverless初体验
abbrlink: 9e26ad45
date: 2022-01-24 16:28:29
tags:
- Serverless
- Web
categories:
- 大前端
---

**Serverless Framework** 是业界非常受欢迎的无服务器应用框架，通过与众多一流云供应商如腾讯云，AWS 等的紧密合作，为广大开发者提供无需关心底层基础设施，即可编写和部署代码的无服务开发体验。

![Serverless Framework](https://tiven.cn/static/img/img-sls-fw-gcMIXgEtUKFKMqWezy8ov.jpg)

[//]: # (<!-- more -->)

## 一、介绍

**Serverless Framework** 同时提供资源管理、弹性伸缩、统计分析等能力，让广大开发者可以节省运维成本，真正做到“按量付费”的同时，也无需花费精力处理日志收集、异常统计等任务。
Tencent Serverless (以下简称 Serverless) 是 Serverless Framework 与腾讯云合作，基于组件（serverless components）为中国用户定制的 `serverlss` 开发完整解决方案。覆盖了开发编码、测试、部署等全生命周期，在保留 `Serverless Framework` 的特点和优势的同时更加切合中国用户的使用场景和习惯。

## 二、Serverless 优势

1. **多语言，多框架支持、远程调试** 
   - `Serverless` 支持众多编程语言，包含：`Node.js`, `Python`, `PHP`, `Java`, `Go` 等。
   - `Serverless` 支持使用框架开发框架进行开发，包括：`Express`, `Koa`, `Egg.js`, `next.js`, `nuxt.js`, `react.js`, `vue.js`, `Flask`, `Laravel` 等。
   - `Serverless` 拥有远程开发模式，开发者可以轻松在本地调试云端代码。
2. **灵活配置、一键部署、日志报警**
   - `Serverless` 通过 `serverless.yml` 和简单配置即可完成所有基础设施（`云函数、API 网关、COS、DB` 等）的创建，部署，和修改。
   - `Serverless` 可以快速在不同环境(stage)和资源地区(region)进行应用部署。同时部署速度可以提升最多 **20** 倍。
   - `Serverless` 提供了更强大的日志收集，统计分析，异常报警服务。开发者无需任何配置即可直接使用。 
3. **高可用、低成本、弹性伸缩**
   - `Serverless` 部署的应用可靠性可以达到 **99.5%** 的可靠性，同时支持灰度发布及版本快速切换。
   - `Serverless` 采用按量计费，在闲置时间不收取任何费用，相比传统付费方式可节省 **80%** 以上的使用成本。
   - `Serverless` 可以进行弹性伸缩，进一步保证了应用的可用性并降低了使用维护成本。
    
## 三、开始开发

通过 `Serverless CLI` 工具无需登录腾讯云控制台就可以轻松创建、开发、调试、部署、查看、移除 `serverless` 应用，使用 `Serverless` 可以进行多种应用开发，同时满足不同的使用场景。

### 1.云函数开发

`Serverless` 为腾讯`云函数`(`SCF`)应用开发者提供了完善的支持，通过 `serverelss CLI` 工具开发者可以快速进行 **本地单函数/多函数开发，代码调试，日志查看以及一键部署** 。结合消息队列，文件系统，事件触发器，数据库等其他云上资源，使`云函数`开发非常便捷同时支持更多使用场景。

### 2.框架应用开发

`Serverless` 为框架应用(如：`Nextjs`, `Express`, `Django`, `SrpintBoot` 等)提供了运行环境支持，通过 `serverless` 开发者可以轻松进行框架应用进行开发或将已有应用通过简单改造迁移到 `serverless` 平台，获得 `serverless` 的全部优势。

### 3.SaaS 应用托管

`Serverless` 为提供了许多 SaaS 应用(如：`Wordpress`, `DiscuzQ` 等)的封装，通过 `serverless` 简单配置就可以部署并在 `serverless` 上使用这些应用，在获得 `serverless` 优势的同时也无需担心应用的后续维护和升级。

## 四、使用 Serverless

1. 安装 `Serverless CLI` 命令行工具

```shell
# 使用 npm 全局安装 serverless 命令行工具
npm install -g serverless

# 升级 serverless 命令行到最新版本
npm update -g serverless

# 使用 bash 安装 serverless 工具
curl -o- -L https://slss.io/install | bash

# 使用 choco 安装 serverless 工具
choco install serverless
```

2. 创建应用

通过 **CLI** 可以快速初始化 **serverless** 应用项目，可以选择使用交互式方式选择组件来进行配置，也可以通过指定组件名称快速创建。

```shell
# 交互式创建 serverless 应用
serverless
# 
sls

# 使用模板创建 serverless 应用并指定名称
serverless init express-starter --name my-sls-express
# or
sls init express-starter --name my-sls-express
```

**提示：** 可以使用 `sls` 代替 `serverless` 来执行 `CLI` 命令，**sls 等同于 serverless**。

## 五、serverless 常用命令

```txt
* 您可以通过 "serverless" 或简称 "sls" 来执行命令
* 使用 "serverless [command] --help" 获取详细帮助信息

init             通过模板初始化新项目
deploy           部署应用到云端
info             获取应用详情
dev              启动调试模式
logs             查看应用日志
remove           移除应用
credentials      管理全局授权信息
registry         查看应用中心的组件与模版信息
publish          发布组件或模版到应用中心
bind role        重新为当前用户分配使用 Serverless 所需权限
```

## 六、创建项目实例

1. 创建一个名称为 `website-test` 的静态网站应用实例

```shell
sls init website-starter --name website-test
```

生成的项目结构：

```txt
/website-test
    /src
        index.html
    README.md
    README_EN.md
    serverless.yml        
```

2. 在项目根目录下创建一个 `.env` 文件

```shell
echo  "" > .env
```

3. 进入腾讯云控制台的 [API密钥管理](https://console.cloud.tencent.com/cam/capi "API密钥管理")，获取 `SecretId` 和 `SecretKey`。如果初次使用就`新建秘钥`，编辑 `.env` 文件：

```sh
# 您账号的 SecretId
TENCENT_SECRET_ID=xxxxxxxxxx 

# 您账号的 SecretKey
TENCENT_SECRET_KEY=xxxxxxxx 
```

4. 在腾讯云控制台的 [Serverless 应用](https://console.cloud.tencent.com/sls "Serverless 应用")，点击新建应用，选择Website静态网站：
![新建Serverless应用](https://tiven.cn/static/img/img-serverless-new--7j4pYkEyUhPwoZEl0Hj7.jpg)
   
5. 新建完成之后拿到：`应用名称`、`实例名称`，配置 `serverless.yml` 文件：

```yaml
# 应用名称，同账号下需唯一
app: website-test 
# [必选]组件名称，就是 第4步 选择的应用类型
component: website 
# [必选]组件实例名称
name: website-rHV4uDmvVx
# 自定义环境信息，用来区分不同环境的实例
stage: dev 

inputs:
  src:
    src: ./src
    index: index.html
    error: index.html
    exclude:
      - .env
  region: ap-guangzhou
  bucketName: my-website-starter
  protocol: https
```

6. 修改 `src/index.html` 首页内容

7. 部署

```shell
sls deploy
```

输出：
```txt
E:\dev\serverless-demo>sls deploy

serverless ⚡components
Action: "deploy" - Stage: "dev" - App: "website-test" - Name: "website-rHV4uDmvVx"

region:  ap-guangzhou
website: https://my-website-starter-1300949752.cos-website.ap-guangzhou.myqcloud.com

应用控制台: https://serverless.cloud.tencent.com/apps/website-test/website-rHV4uDmvVx/dev

19s » website-rHV4uDmvVx » 执行成功

**************************************************
邀请您填写调查问卷: https://www.surveymonkey.com/r/slcusage
**************************************************

```

点击输出信息中的 [website](https://my-website-starter-1300949752.cos-website.ap-guangzhou.myqcloud.com "Serverless Website | 天問") 后边的url就可以访问刚刚创建的`website-test`静态应用。

## 七、总结

**Serverless** 免去了服务器购买，Nginx配置等等繁琐环节。10分钟就能创建外网可访问的web应用，还可以配置自定义域名（已备案的域名）和CDN加速，一条龙服务简直不要太爽，体验杠杠的。

---

欢迎访问：[天问博客](https://tiven.cn/p/9e26ad45/ "天問博客")
