---
title: Vue3.0的强势升级点
abbrlink: 98493f5
date: 2021-11-09 09:54:56
tags:
- Vue
categories:
- Vue
---

`Vue3.0`在架构上相比`vue2.x`做了升级，性能上得到了很大的提升，`Composition API`的出现，让组件抽离、逻辑代码复用更加灵活。

![Vue3.0](https://tiven.cn/static/img/heart-sky-dahl-blue-sky-preview-pzTeSckBZJeE9hYkbwyyX.jpg)

[//]: # (<!-- more -->)

## 一、Composition API: 组合API/注入API

这里要说到代码的组织方式，传统的网页是html/css/javascript（结构/样式/逻辑）分离。vue/react通过组件化的方式，将联系紧密的结构/样式/逻辑放在一起，有利于代码的维护。

`Composition api`更进一步，着力于JavaScript（逻辑）部分，将逻辑相关的代码放在一起，近而有利于代码的维护。

在vue2的组件内，使用的是`Option API`风格(data/methods/mounted)来组织的代码，这样会让逻辑分散，举个例子就是我们完成一个计数器功能，要在data里声明变量，在methods定义响应函数，在mounted里初始化变量，如果在一个功能比较多、代码量比较大的组件里，你要维护这样一个功能，就需要在data/methods/mounted反复的切换到对应位置，然后进行代码的更改。

在vue3中，使用setup函数。如下所示跟count相关的逻辑，都放到counter.js文件里，跟todo相关的逻辑放到todos.js里。

```js
import useCounter from './counter'
import useTodo from './todos'

setup(){
  let { val, todos, addTodo } = useTodo()
  let {count,add} = useCounter() 
  return {
    val, todos, addTodo,
    count,add,
  }
}

```

在我看来这就是`Composition API`最大的特点，以功能为单位的代码组织方式。同时它可以让`代码更易重用`。

说到重用，`Composition API`的方式也比`mixin`的方式好很多，你可以清楚的看到组件使用的数据和方法来自哪个模块，而mixin进组件的功能，常常会让我们困惑此功能来自哪个`mixin`。

## 二、自定义渲染API（Custom Renderer API）

### vue2.x架构问题

vue2.x最开始支持运行在浏览器中，渲染到浏览器的dom上，随着vue的流行，出现了`weex`和`myvue`。

- `weex`：移动端跨平台方案，需要渲染到移动设备。weex被写在vue原项目里，缺点是这使vue原项目更大了，也不是通用解决方案。
- `myvue`：小程序上使用，需要渲染到小程序框架上。myvue是单独fork一份源代码进行更改，缺点也非常明显，myvue中vue的版本跟官方版本从fork的那一刻开始，就要开始不一致了。

vue2.x项目架构对于这种渲染到不同平台不太友好，vue3.0推出了自定义渲染API解决了该问题。

下面我们先看vue2和vue3的`入口写法`有所不同：

```js
// vue2
import Vue from 'vue'
import App from './App.vue'
new Vue({ => h(App)}).$mount('#app')

// vue3
const { createApp }  from 'vue'
import App from "./src/App"
createApp(App).mount(('#app')

```

vue官方实现的 `createApp` 会给我们的 `template` 映射生成 `html` 代码，但是要是你不想渲染生成到 `html` ，而是要渲染生成到 canvas 之类的不是html的代码的时候，那就需要用到 Custom Renderer API 来定义自己的 render 渲染生成函数了。

```js
// 你自己实现一个createApp，比如是渲染到canvas的。
import { createApp } from "./runtime-render";
import App from "./src/App"; // 根组件

createApp(App).mount('#app');
```

有了`Custom Renderer API`，如`weex`和`myvue`这类方案的问题就得到了完美解决。只需重写`createApp`即可。

## 三、更先进的组件

### Fragment组件

* `vue2`是不允许这样写的，组件必须有一个跟节点，现在可以这样写，vue将为我们创建一个虚拟的`Fragment`节点。

```js
<template>
  <div>Hello</div>
  <div>World</div>
</template>

```

这样写有何好处呢？一是如果根节点不是必要的，无需创建了，减少了节点数。二是`Fragment`节点是虚拟的，不会`DOM树`中呈现。

### Suspense组件

```js
<Suspense>
  <template >
    <Suspended-component />
  </template>
  <template #fallback>
    Loading...
  </template>
</Suspense>

```

在Suspended-component完全渲染之前，备用内容会被显示出来。如果是异步组件，`Suspense`可以等待组件被下载，或者在设置函数中执行一些异步操作。

## 四、更好的TS支持

vue2不适合使用`ts`，原因在于vue2的`Option API`风格。`options`是个简单对象，而ts是一种类型系统、面向对象的语法。两者有点不匹配。

在vue2结合ts的具体实践中，要用 vue-class-component 强化 vue 组件，让 `Script` 支持 `TypeScript` 装饰器，用 `vue-property-decorator` 来增加更多结合 Vue 特性的装饰器，最终搞的ts的组件写法和js的组件写法差别挺大。

在vue3中，量身打造了`defineComponent`函数，使组件在ts下，更好的利用参数类型推断 。`Composition API` 代码风格中，比较有代表性的api就是 `ref` 和 `reactive`，也很好的支持了类型声明。

```js
import { defineComponent, ref } from 'vue'
 
const Component = defineComponent({
    props: {
        success: { type: String },
        student: {
          type: Object as PropType<Student>,
          required: true
       }
    },
    setup() {
      const year = ref(2020)
      const month = ref<string | number>('9')
     
      month.value = 9 // OK
     const result = year.value.split('') // => Property 'split' does not exist on type 'number'
 });
```

## 五、更快的开发体验（vite开发构建工具）

在使用webpack作为开发构建工具时，npm run dev都要等一会，项目越大等的时间越长。热重载页有几秒的延迟，但是如果用vite来做vue3的开发构建工具，npm run dev 秒开，热重载也很快。这种开发体验真是很爽，拒绝等待。

`vite`的原理还是用了浏览器支持`import`关键字了，启动项目不用`webpack`构建工具先构建了，浏览器直接请求路由对应的代码文件，代理服务器针对单个文件进行编译并返回。如果请求的文件里还import了其他文件，同理浏览器继续发请求，代理服务器返回。就这样实现了npm run dev时无需编译，实时请求实时编译。

## 六、按需编译，体积比Vue2.x更小（`Tree shaking`）

在vue3中，可以如下面这样引用vue的功能函数，如果你的项目没有用到`watch`，那编译时就会把`tree shaking`掉。

```js
import { computed, watch, nextTick } from "vue";

```

利用的就是 `ES6` 模块系统`import`/`export`。

## 七、性能比2.x快1.2～2倍

### diff算法的优化

在vue2中，`虚拟dom`是全量比较的。

在vue3中，增加了静态标记PatchFlag。在创建`vnode`的时候，会根据vnode的内容是否可以变化，为其添加静态标记PatchFlag。diff的时候，只会比较有PatchFlag的节点。 PatchFlag是有类型的，比如一个可变化文本节点，会将其添加PatchFlag枚举值为TEXT的静态标记。这样在diff的时候，只需比对文本内容。需要比对的内容更少了。PatchFlag还有动态class、动态style、动态属性、动态key属性等枚举值。

### render阶段的静态提升（render阶段指生成虚拟dom树的阶段）

在vue2中，一旦检查到数据变化，就会`re-render`组件，所有的`vnode`都会重新创建一遍，形成新的`vdom树`。

在vue3中，对于不参与更新的`vnode`，会做静态提升，只会被创建一次，在re-render时直接复用。

静态提升可以理解为第一次render不参与更新的`vnode`节点的时候，保存它们的引用。re-render新vdom树时，直接拿它们的引用过来即可，无需重新创建。

### 事件侦听缓存

在vue2中，我们写的@click="onClick"也是被当作`动态属性`，diff的时候也要对比。但我们知道它不会变化，比如变成@click="onClick2"，绑定别的值。

在vue3中，如果事件是不会变化的，会将onClick`缓存`起来（跟静态提升达到的效果类似），该节点也不会被标记上`PatchFlag`（也就是无需更新的节点）。这样在`render`和`diff`两个阶段，事件侦听属性都节约了不必要的性能消耗。

我曾经维护过一个拥有很庞大dom树的页面。由于节点非常多，无需参与更新的节点也很多，使用vue2的情况下，在render和diff两个阶段，消费了很多性能，如果当时有vue3的话，我想性能会被优化很多。

### 减少创建组件实例的开销

vue2.x每创建一个实例，在this上要暴露data、props、computed这些，都是靠Object.defineProperty去定义的。这部分操作还是挺费时的。

vue3.0中基于`Proxy`，减少了创建组件实例的性能开销。

## 总结：

* 其他的，数据监听方式变成了`Proxy`，消除了`Object.defineProperty`现有的限制（例如无法检测新的属性添加），并提供更好的性能。
* `vue3`解决了vue2的一些问题，大型应用的性能问题、`ts`支持不友好问题，自定义渲染API解决体系架构存在的问题，如果在vue3的基础上实现weex框架会好很多。也做出了很多优化，`Composition API`让代码的组织形式更好。`vite`开发构建工具让开发体验更好，`Tree shaking`让包更小、性能更优。
* 总的来说vue3还是非常棒，非常强大，带来了很多非常好的新特性。

---

## 《Vue3学习与实战》系列

* [Vue3学习与实战 · 组件通信](https://tiven.cn/p/97da9e37/ "Vue3组件通信")
* [Vue3学习与实战 · 全局挂载使用Axios](https://tiven.cn/p/7f7ba3b2/ "全局挂载使用Axios")
* [Vue3学习与实战 · 配置使用vue-router路由](https://tiven.cn/p/3747153d/ "配置使用vue-router路由")
* [Vue3学习与实战 · Vuex状态管理](https://tiven.cn/p/de821c2f/ "Vuex状态管理")
* [vue3 + vite实现异步组件和路由懒加载](https://tiven.cn/p/d41c4425/ "vue3实现异步组件和路由懒加载")
* [Vite+Vue3+Vant快速构建项目](https://tiven.cn/p/de241e23/ "Vite+Vue3+Vant快速构建项目")

---

欢迎访问：[天問博客](https://tiven.cn/p/98493f5/ "天問博客") 
