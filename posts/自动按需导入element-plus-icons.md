---
title: 自动按需导入element-plus/icons
tags:
- Vue
- Vite
categories:
- ElementUI / Vant
abbrlink: edf876ae
date: 2023-02-23 18:26:35
---

[element官网](https://element-plus.gitee.io/zh-CN/component/icon.html#%E8%87%AA%E5%8A%A8%E5%AF%BC%E5%85%A5 "自动导入") 提供了 element-plus/icons 自动导入的方法和[Vite配置模版](https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L21-L58 "Vite配置模版")，但是在使用过程中还是遇到了坑。 

![element-plus/icons 自动导入](https://tiven.cn/static/img/img-element-01-ew4zUkdDxXfzlsCsQap5z.jpg)

[//]: # (<!-- more -->)

## 安装依赖

```shell
pnpm add -S @element-plus/icons-vue

pnpm install -D unplugin-icons unplugin-auto-import
```

## 修改 vite.config.ts 配置文件

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'node:path'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/web/',
  resolve: {
    // 在导入模块时，如果模块路径不包含文件扩展名，则会尝试添加下面这些扩展名
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    // 在导入模块时，如果模块路径以 / 开头，则会尝试在下面这些目录中查找该模块
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/assets/img'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      // dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
    UnoCSS(),
  ],
})
```

## 遇到的问题

直接从官网复制 `icon` 组件却不能正常渲染。如下：

```html
<el-icon size="20">
    <Edit />
</el-icon>
```

正确写法：需要在[官方图标集合](https://element-plus.gitee.io/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88 "Icons")中标识的图标名前 **追加前缀 `IEp`** 使用。

```html
// 正确的写法是
<el-icon size="20">
  <i-ep-edit-location />
</el-icon>

<!-- 或 -->

<el-button type="primary">
  <el-icon><IEpSearch /></el-icon>搜索
</el-button>
```


---

欢迎访问：[天问博客](https://tiven.cn/p/edf876ae/ "天问博客-专注于大前端技术")

