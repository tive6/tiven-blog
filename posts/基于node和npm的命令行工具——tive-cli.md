---
title: 基于node和npm的命令行工具——tive-cli
abbrlink: d85f4546
date: 2021-12-30 16:02:06
tags:
- Node
- npm
- Shell
categories:
- 开源造轮子
description: 前端开发过程中经常会用到各种各样的脚手架工具、npm全局工具包等命令行工具，为了开发方便自行开发了一套基于node和npm的命令行工具集，主要封装了自动化shell脚本工具和开箱即用的Vue全家桶模板工具。| 天问博客
---

前端开发过程中经常会用到各种各样的`脚手架工具`、`npm全局工具包`等`命令行工具`，如：Vue脚手架`@vue/cli`、React脚手架`create-react-app`、node进程守卫工具`pm2`、本地静态服务工具`serve`、代码格式化工具`prettier`等等。因此也自行开发了一套基于`node`和`npm`的命令行工具集，主要封装了`自动化shell脚本工具`和开箱即用的`Vue全家桶模板工具`。

![tive-cli](https://tiven.cn/static/img/img-tive-cli-02-MBAvXFNlTamSyXYvlo5n-.jpg)

<!-- more -->

## 一、全局安装

**提示：** tive-cli 依赖 [Node.js](https://nodejs.org/en/) (>=7.x)

```
npm install tive-cli -g
```

## 二、Vue全家桶模板工具

### 1.介绍

模板工具内置了`Vue2.0`和`Vue3.0`两个版本所对应的 **Vue全家桶** 模板，可根据项目需要自行选择使用。

1. vue2.0+VantUI移动端模板
2. vue3.0+vite2+VantUI移动端模板

### 2.使用

```shell
# 自定义目录生成
tive create <project-name>

# 当前目录生成
tive create .
```

执行次命令后，会出现命令行交互式选择，可使用上（`↑`）下（`↓`）箭头进行选择，如下：

```txt
E:\dev>tive create vue3-demo
? 请选择要创建的脚手架或Demo (Use arrow keys)
> vue2.0+VantUI移动端Demo
  vue3.0+vite2+VantUI移动端Demo
```

回车（`enter`）确认后，会输出：

```txt
E:\dev>tive create vue3-demo
? 请选择要创建的脚手架或Demo vue3.0+vite2+VantUI移动端Demo
{ tel: 'tive6/tive-vue3-vite-demo' }
√ tive-vue3-vite-demo 下载成功

Done. Now run:

   cd vue3-demo
   npm install
   npm start

```

接下来就可以按照提示的命令进行操作：

```sh
cd vue3-demo

npm install

npm start
```

演示Demo：

- vue2.0+VantUI移动端模板：[tive-vue2-mobile-demo](https://tiven.cn/tive-vue2-mobile-demo/ "tive-vue2-mobile-demo")
- vue3.0+vite2+VantUI移动端模板：[tive-vue3-vite-demo](https://tiven.cn/tive-vue3-vite-demo/ "tive-vue3-vite-demo")

## 三、自动化shell脚本工具

### 1.介绍

脚本工具封装了两个常用的`Git常用脚本命令`和`自定义的shell脚本命令`，并统计了执行时长。

### 2.使用

#### 2-1.Git常用脚本命令

1. push当前分支代码到远程仓库

```shell
tive git -b <branch> -m "commit description"
```

**例：** push master分支代码到远程仓库

```shell
tive git -b master -m "master commit" 
```

相当于依次执行了以下6个命令：

```shell
git status
git add .
git commit -m "master commit"
git pull origin master
git push origin master
git status
```

2. 当前分支合并到目标分支并push到远程仓库

```shell
tive git -b <current branch> -t <target branch> -m "commit description"
```

**例：** 将dev分支合并到test分支并push到远程仓库

```shell
tive git -b dev -t test -m "dev merge"
```

等价于依次执行了以下10个命令：

```shell
git status
git add .
git commit -m "dev merge"
git pull origin dev
git checkout test
git pull origin test
git merge --no-ff -m "dev merge into test" dev
git push origin test
git checkout dev
git status
```

#### 2-2.自定义的shell脚本命令

需要在项目根目录下新建`tive.config.js`，和`package.json`同级

```javascript
// tive.config.js

module.exports = {
    shell: [
        'node -v',
        'npm -v',
        'ls',
        'git status',
    ]
}
```

**提示：** 
1. `shell命令`可以根据项目需要灵活搭配，如：git命令、node命令、npm脚本命令、shell脚本命令等等。
2. 前端项目可以在`package.json`文件的`scripts`中配置对应的`npm命令`。配置例如：

```json5
{
  "scripts": {
    "start": "npm run serve",
    "serve": "vue-cli-service serve",
    "dev": "nodemon --watch vue.config.js --exec \"npm start\"",
    "build": "vue-cli-service build",
    "git": "tive git -c tive.config.js",
  },
}
```

现在就可以愉快的使用 `npm run git` 命令来执行脚本了。

```shell
npm run git
```

输出：

```txt
E:\dev\vue-demo>npm run git

> vue-demo@1.0.0 git
> tive git -c tive.git.config.js

-  Doing ... 
┍-------------------- node -v --------------------┑

[command]=>     node -v (成功)
[code]=>        0
[output]=> 
v12.5.0

┕-------------------- node -v --------------------┙
-  Doing ... 
┍-------------------- npm -v --------------------┑

[command]=>     npm -v (成功)
[code]=>        0
[output]=> 
7.17.0

┕-------------------- npm -v --------------------┙
\  Doing ... 
┍-------------------- ls --------------------┑

[command]=>     ls (成功)
[code]=>        0
[output]=> 
babel.config.js
node_modules
package.json
public
README.md
src
tive.config.js
vue.config.js

┕-------------------- ls --------------------┙
|  Doing ... 
┍-------------------- git status --------------------┑

[command]=>     git status (成功)
[code]=>        0
[output]=> 
On branch dev
nothing to commit, working directory clean

┕-------------------- git status --------------------┙
√  Run successfully 

 DONE  End of shell script in 935ms
 
```

## 四、tive-cli其他命令

1. 查看 `tive` 的帮助信息

```shell
tive
# or 
tive -h
```

2. 查看 `tive create` 的帮助信息

```shell
tive create
# or 
tive create -h
```

3. 查看 `tive git` 的帮助信息

```shell
tive git
# or 
tive git -h
```

## 五、TODO

* `tive ssh`命令：基于`node`封装一套`CI/CD`命令行工具，做到一行命令完成项目打包、zip压缩、文件上传、解压上线、重启服务等等一系列操作。
* 规划中...

---

欢迎访问：[天问博客](https://tiven.cn/p/d85f4546/ "天問博客") 






