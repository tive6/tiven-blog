---
title: pm2的安装和常用命令
tags:
- Node
- npm
categories:
- Node
abbrlink: 999defa6
date: 2022-05-05 16:15:25
---

**PM2** 是 Node.js 应用程序的生产流程管理器，内置负载均衡。它可以帮助您保持 Node 应用程序永久活动，重起这些 node 应用程序也不需要停机，并简化常见的系统管理任务。

![Node && PM2](https://tiven.cn/static/img/img-pm2-nbGS5mHrYfkp-kcsGkaxG.jpg)

[//]: # (<!-- more -->)

## 一、安装

```shell
npm install pm2@latest -g
# or
yarn global add pm2
# or
pnpm add pm2 -g

# 更新 PM2 
pm2 update
```

## 二、常用命令

1. 启动应用

```shell
# 支持不同文件格式
pm2 start app.js
pm2 start bashscript.sh
pm2 start python-app.py
pm2 start binary-file
pm2 start "npm run start"
pm2 start "ls -la"
pm2 start app.py

# 设置启动应用的显示名称
pm2 start app.js --name <app_name>

# 监控应用目录，一旦有文件发生更改就立刻重启应用
pm2 start app.js --watch

# 设置应用重启时，能使用内存的最大值
pm2 start app.js --max-memory-restart <200MB>

# 启动时，传递参数给 app 应用
pm2 start app.js -- arg1 arg2 arg3

# 禁止自动重启应用
pm2 start app.js --no-autorestart
```

2. 重启、重载、停止、删除

```shell
pm2 restart app_name|app_id|all
pm2 reload app_name|app_id|all
pm2 stop app_name|app_id|all
pm2 delete app_name|app_id|all

pm2 restart app.js
pm2 restart app1 app3 app4

# 重置 restart 的计时器
pm2 reset all 
```

3. 查看运行状态

```shell
# 查看所有进程信息（app_name、app_id等）
pm2 [list|ls|status]

# 格式化输出所有pm2启动的进程
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

# 对应用进行排序查看
pm2 list --sort name:desc
# Or
pm2 list --sort [name|id|pid|memory|cpu|status|uptime][:asc|desc] 

# 查看某个应用详情
pm2 describe app_name|app_id
pm2 show api
```

4. 查看某个pm2进程具体情况

```shell
pm2 monit
```

5. 日志信息

```shell
pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # 清空logs
pm2 reloadLogs         # Reload all logs
```

6. 保存当前应用列表

```shell
pm2 save
```

7. 重新加载保存的应用列表

```shell
pm2 resurrect
```

8. pm2搭建静态文件服务器

```shell
pm2 serve <path> <port> [options]

# 例1
pm2 serve ./dist/ 3001 --name vue-demo

# 例2
pm2 serve /home/admin/www/ 3001 --name www
```


## 三、PM2的配置文件

使用 PM2 管理多个应用程序时，使用一个 JS 配置文件来组织它们。
要生成示例配置文件，您可以键入以下命令：

```shell
pm2 init 
# or
pm2 init simple
```

这将生成一个 `ecosystem.config.js` 配置文件：

```js
module.exports = {
  apps : [{
    name: 'blog',
    script: 'pnpm start',
    watch: './source/_posts',
    max_memory_restart: '150M',
  }],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};

```

如果您正在创建自己的配置文件，请确保它以 `.config.js` 结尾，以便 PM2 能够将其识别为配置文件。

**参考文档：**

* https://pm2.keymetrics.io/docs/usage/quick-start/
* https://pm2.fenxianglu.cn/docs/start

---

欢迎访问：[天问博客](https://tiven.cn/p/999defa6/ "天问博客-专注于大前端技术")



