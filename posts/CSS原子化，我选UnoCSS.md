---
title: CSS原子化，我选UnoCSS
tags:
- UnoCSS
categories:
- CSS3
abbrlink: eddf1232
date: 2023-10-08 16:03:20
---

如果你没有听说过 **tailwindcss** 或者 **unocss**，请先 ~~return~~ 先去了解一下😝。

![UnoCSS](https://tiven.cn/static/img/unocss-01-SnYAGZfI.jpg)

[//]: # (<!-- more -->)

## 相同的原由 & 前言

*   开发上：可能为你甚至你们的前端团队**节省很多写样式的时间**，也能让你或者你们的项目**开发体验有很大提升**
*   生产上：你们的项目打出来的包体积中的**样式代码占比将突然骤降然后趋于不变**。

## 为什么我换到了UnoCSS

`tailwindcss` 和 `UnoCSS` 都是原子化CSS模式实现的一种，为什么现在我更推荐 `UnoCSS` ，接下来就讲一下 `UnoCSS` 的杀手级亮点：

## 跳过解析，不使用 AST

从内部实现上看，Tailwind 依赖于 PostCSS 的 AST 进行修改。考虑到在开发过程中，这些工具 CSS 的并不经常变化，UnoCSS 通过非常高效的字符串拼接来直接生成对应的 CSS 而非引入整个编译过程。同时，UnoCSS 对类名和生成的 CSS 字符串进行了缓存，当再次遇到相同的实用工具类时，它可以绕过整个匹配和生成的过程。
现在说是比 `tailwindcss` 快5倍，其实当年可是比 `tailwindcss JIT` 模式快200倍的存在，后面 `tailwindcss` 应该是做了大量的优化工作，才让托尼老师改口称5倍快了😜。

## 完全可定制，不是一个框架，而是引擎

相比于 `tailwindcss` 必须把原子类写到 `class` 里面， `UnoCSS` 提供了更多可选方案，并且兼容多种风格的原子类框架，除了 `tailwindcss` ，同样支持 `Bootstrap`， `Tachyons`，`Windi CSS`

## 属性化模式

这个模式也是由 `Windi CSS` 启发而来：Attributify preset

```shell
// install  
pnpm add -D @unocss/preset-attributify
```

```typescript
// uno.config.ts  
import { defineConfig } from 'unocss'  
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({  
  presets: [  
    presetAttributify({ /* preset options */ }),  
    // ...  
  ],  
}) 
```

eg🌰：

```html
<div class="m-2 rounded text-teal-400" />
<!-- 现在你可以这么写： -->  
<div m-2 rounded text-teal-400 />  
```

## 前缀组，解决繁琐的多次写前缀的情况

Variant group transformer

```shell
// install  
pnpm add -D @unocss/transformer-variant-group
```

```typescript
// uno.config.ts  
import { defineConfig } from 'unocss'  
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({  
  // ...  
  transformers: [  
    transformerVariantGroup(),  
  ],  
})  
```

比如我们在设置字体的时候常常会设置颜色、大小，或者在 `hover` 的情况下改动多个属性我们就可以这样

eg🌰：

```html
<div class="hover:bg-gray-400 hover:font-medium font-light font-mono"/>
<!-- 简化之后： -->  
<div class="hover:(bg-gray-400 font-medium) font-(light mono)"/>
```

## 快捷方式和指令

Directives transformer

```shell
// install  
pnpm add -D @unocss/transformer-directives
```


```typescript
// uno.config.ts  
import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // ...  
  transformers: [
    transformerDirectives(),
  ],
})
```

用过 `tailwindcss` 的同学都知道， `tailwindcss` 有指令系统，其中的 `@layer components` 指令可以把通用的样式 `layer` 到一个类上：

```css
@layer components {  
  .btn-blue {  
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;  
  }  
}  
```

`UnoCSS` 有类似的更好用快捷方式来快捷实现这个功能：

```typescript
{
  shortcuts: [
    // you could still have object style  
    {
      btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
    },
    // dynamic shortcuts  
    [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
  ]
}
```

另外还有一个使用很频繁的指令 `@apply` ，这个指令在以下两种情况下比较合适使用：

* 有一个样式很多，很复杂的元素，直接写到标签里面会影响代码可读性，同样的样式应用到很多元素上

eg🌰：

```html
<div text-lg text-pink-400 font-bold border-1 border-gray border-dashed rounded flex flex-warp items-center justify-evenly>  
  我的样式很复杂的
</div>  
<button text-green-500 rounded hover:text-lg shadow-md>查询</button>  
<button text-green-500 rounded hover:text-lg shadow-md>提交</button>  
<button text-green-500 rounded hover:text-lg shadow-md>取消</button>
```

就可以这么优化：

```html
<div class="complex-node">  
  我的样式很复杂的
</div>  
<button class="btn">查询</button>  
<button class="btn">提交</button>  
<button class="btn">取消</button>  

<style>  
.complex-node {  
  @apply text-lg text-pink-400 font-bold border-1 border-gray border-dashed rounded flex flex-warp items-center justify-evenly;  
}  
.btn {  
  @apply text-green-500 rounded hover:text-lg shadow-md;  
}  
</style>  
```

## 构建合并多个原子类到一个类

Compile class transformer

```shell
// install  
pnpm add -D @unocss/transformer-compile-class
```

```typescript
// uno.config.ts  
import { defineConfig } from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class'

export default defineConfig({
  // ...  
  transformers: [
    transformerCompileClass(),
  ],
})
```

这个特性一般比较少用，也可以看下是什么作用，通过 `:uno:` 标记，可以最终编译为一个类：

```html
<div class=":uno: text-center sm:text-left">  
  <div class=":uno: text-sm font-bold hover:text-red"/>
</div>  
```

最终编译的结果：

```html
<div class="uno-qlmcrp">  
  <div class="uno-0qw2gr"/>
</div>

<style>
  .uno-qlmcrp {
    text-align: center;
  }
  .uno-0qw2gr {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
  }
  .uno-0qw2gr:hover {
    --un-text-opacity: 1;
    color: rgba(248, 113, 113, var(--un-text-opacity));
  }
  @media (min-width: 640px) {
    .uno-qlmcrp {
      text-align: left;
    }
  }
</style>
```

## 检查器，可以详细的预览我们项目中的所有原子类

我们在启动开发服务器之后，可以直接访问localhost:5173/\_\_unocss 就会看到这个画面：

## 你的项目太老也想用？安排！

有些同学可能还在维护很老的前端项目，但是也想用上 `UnoCSS` 来提升开发体验， `UnoCSS` 提供了 `CDN` 版本，在前端的入口 `index.html` 文件中添加一行代码就可以支持，并且还支持配置💪：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
<script>  
// pass unocss options  
window.__unocss = {  
  rules: [  
    // custom rules...  
  ],  
  presets: [  
    // custom presets...  
  ],  
  // ...  
}  
</script>  
```

## 你以为到这里就结束了？

再来给你看个好东西！

Icons preset (unocss.dev)

可以在 `UnoCSS` 中轻松集成纯 `CSS` 图标，可以在这里查看所有可用图标，想用哪种就可以安装对应的包即可：

```typescript
// uno.config.ts  
import { defineConfig } from 'unocss'  
import presetIcons from '@unocss/preset-icons'

export default defineConfig({  
  presets: [  
    presetIcons({ /* options */ }),  
    // ...other presets  
  ],  
})
```  

没有你们设计中意的图标，`UI` 自己设计的图标也可以轻松集成,首先安装工具：

```shell
pnpm install -D @iconify/utils
```

然后把设计老师给的 `svg` 图标文件放到一个文件夹，我这里就放到`src/assets/svg`中，然后想一个图标名称，这里就叫 `icon` 吧

```typescript
// unocss.config.ts  
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'  
import {  
  defineConfig,  
  presetAttributify,  
  presetIcons,  
  presetUno,  
} from 'unocss'

export default defineConfig({  
  presets: [  
    presetUno(),  
    presetAttributify(),  
    presetIcons({  
      collections: {  
        icon: FileSystemIconLoader(  
          './src/assets/svg',  
          svg => svg.replace(/#FFF/, 'currentColor'),  
        ),  
      },  
      scale: 1.5,  
      warn: true,  
    }),  
  ],  
})  
```

可以看到配置中 `collections` 里面有一个 `icon` 对象，这个名称就对应了我们刚才说的 `icon` 名称，对应的是一个 `FileSystemIconLoader` 方法，方法的第一个参数是你的图标在项目中的路径，我这里就是 `./src/assets/svg`，按照相对路径就可以，也可以通过第二个参数做一些特殊预处理操作，具体可以看这个文档，这样配置完成之后，我们就可以在项目使用了。

比如我在`src/assets/svg`文件夹中放了一个 `cancel.svg` 的取消图标，我在页面上使用就可以这样写：

```html
<div text-lg text-red inline-block i-icon:cancel /> 
```

其中的 `i-icon` 就是我们前面配置的自定义图标集的名称，冒号后面跟的就是你的 `svg` 图标的名称，可以通过样式改变图标的大小和颜色，是不是很酷😎。

## 丰富、灵活、开放的预设生态

`UnoCSS` 提供了丰富的预设，以支持不同风格体系的前端开发者，生态很完善，在 `UnoCSS` 发布之后我在很多项目中都应用实践过，基本可以覆盖所有样式场景。

## 总结

`原子化CSS` 的理念早已不是新鲜事物了， `tailwindcss` 、`UnoCSS` 这类解决方案把这个理念有了一个很好的实践和实现，可以真正的提升开发者体验和编码效率，都是很值得一学的技术。

参考文档：https://alfred-skyblue.github.io/unocss-docs-cn/

**文章转载**
- 作者：Senar
- 地址：https://mp.weixin.qq.com/s/vAHdUQwCN-J815iIYuyAeA

---

欢迎访问：[天问博客](https://tiven.cn/p/eddf1232/ "天问博客-专注于大前端技术")

