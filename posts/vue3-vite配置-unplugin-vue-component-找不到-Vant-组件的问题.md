---
title: vue3+vite配置 unplugin-vue-component 找不到 Vant 组件的问题
tags:
- Vue
- Vite
- Vant
categories:
- Vite
abbrlink: 6d85bc69
date: 2023-05-07 14:31:27
---

使用 vue3 + vite + Vant 搭建移动端项目，为了避免全量引入 vant 导致打包体积过大，又不想一个一个组件手动导入，所以就选择了 vant 官方推荐的方法，使用 `unplugin-vue-components` 插件自动引入组件，并按需引入组件的样式。
但是运行过程中遇到了报错：`[vite] Internal server error: Failed to resolve import "vant/es" from "xxx"`

![vue3 + vite](https://tiven.cn/static/img/img-vite-02-K96QMI1AHD56Igz67ML5T.jpg)

<!-- more -->

## 项目依赖

* package.json

```json
{
  "name": "vue3-demo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "git": "tive git -c tive.git.config.cjs",
    "lint": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./src",
    "lint:stylelint": "stylelint --cache --fix \"src/**/*.{less,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
    "prepare": "husky install"
  },
  "dependencies": {
    "amfe-flexible": "^2.2.1",
    "axios": "^1.4.0",
    "lib-flexible": "^0.3.2",
    "pinia": "^2.0.35",
    "vant": "^4.3.1",
    "vue": "^3.2.47",
    "vue-router": "4.0.1"
  },
  "devDependencies": {
    "@types/node": "^20.1.0",
    "@typescript-eslint/eslint-plugin": "^5.59.2",
    "@typescript-eslint/parser": "^5.59.2",
    "@vitejs/plugin-vue": "^4.1.0",
    "typescript": "^5.0.2",
    "unplugin-vue-components": "^0.24.1",
    "vite": "^4.3.2",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-style-import": "^2.0.0",
    "vue-eslint-parser": "^9.2.1",
    "vue-tsc": "^1.4.2"
  },
  "lint-staged": {
    "*.{js,jsx,tsx,ts}": [
      "npm run lint",
      "npm run lint:stylelint"
    ]
  }
}
```

## 完整报错

```js
  Plugin: vite-plugin-eslint
  File: /Users/tiven/Desktop/dev/yc-chat-mbi/src/components/Footer.vue
2:47:05 PM [vite] Internal server error: Failed to resolve import "vant/es" from "src/components/Footer.vue". Does the file exist?
  Plugin: vite:import-analysis
  File: /Users/tiven/Desktop/dev/yc-chat-mbi/src/components/Footer.vue:1:89
  1  |  /* unplugin-vue-components disabled */import { Field as __unplugin_components_1 } from 'vant/es';import 'vant/es/field/style/index';
     |                                                                                          ^
  2  |  import { Button as __unplugin_components_0 } from 'vant/es';import 'vant/es/button/style/index';
  3  |  import { defineComponent as _defineComponent } from "vue";
```

* vite.config.ts 配置如下：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'node:path'
import viteCompression from 'vite-plugin-compression'
import postCssPxToRem from 'postcss-pxtorem'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 在导入模块时，如果模块路径不包含文件扩展名，则会尝试添加下面这些扩展名
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    // 在导入模块时，如果模块路径以 / 开头，则会尝试在下面这些目录中查找该模块
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/assets/img'),
    },
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        chunkFileNames: 'assets/js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名，[name]表示文件名,[hash]表示该文件内容hash值
      },
      // external: ['antd'],
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
    }),
    viteCompression({
      threshold: 1024 * 4,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, //1rem的大小
          propList: ['*'], //需要转换的属性
          selectorBlackList: ['.norem'], //过滤掉不需要转换的类名
        }),
      ],
    },
  },
})
```

## 解决办法

修改 `vite.config.ts` 下的 `resolve.extensions` 参数配置，加入 `.mjs` 拓展名即可解决。

```ts
export default defineConfig({
  resolve: {
    // 在导入模块时，如果模块路径不包含文件扩展名，则会尝试添加下面这些扩展名
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    // 在导入模块时，如果模块路径以 / 开头，则会尝试在下面这些目录中查找该模块
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/assets/img'),
    },
  },
})
```


---

欢迎访问：[天问博客](https://tiven.cn/p/6d85bc69/ "天问博客-专注于大前端技术")

