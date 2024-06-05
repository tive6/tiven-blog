---
title: SolidJS——前端新秀框架，性能直逼原生JS
abbrlink: b2ff9578
date: 2022-01-28 17:13:50
tags:
- JS
- Solid
categories:
- Svelte / Solid
---

**SolidJS** 是什么？`SolidJS`是一个声明式、高效且灵活用于构建用户界面的 `JavaScript` 库。 **Solid** 号称拥有 **JSX** 语法，类似于 **React hook** 的语法，你可以用现代化的开发方式，获得性能最快的代码。

![SolidJS](https://tiven.cn/static/img/img-solid-01-nCwpdXWB46UYNVPjYNlS-.jpg)

<!-- more -->

## 一、性能比较

原生 `JS` 是 1， `Solid` 是 1.05， 比 `Svelte` 也快，`React` 跑到了 1.93 。如图：

![SolidJS Benchmark](https://tiven.cn/static/img/img-solid-02--QiV__woNP-s706kY7-hk.jpg)

## 二、SolidJS 特点

1. **直接使用浏览器的 `DOM`, 没有 `虚拟DOM`， `DOM diff` 一整套算法** ，可以发现它编译出来的代码，他的 `DOM` ，是原生 `DOM` ，其他的语法是直接调用的，也没有那一整套复杂的虚拟 `DOM`。
2. **提前编译，按需打包** ，无论是 `react` 还是 `vue` ，不管怎么编译，都需要引入`框架本身`。也就是 `runtime` 。而且这个体积还比较大。这些框架都采用的是用运行时方案，运行时方案相比于编译时方案，最大的优势是可以「几乎没有任何语法约束」的去完成代码编写。而 `Solid` 则预编译，将 `jsx` 部分的代码，转换成原生的语法。
3. **响应式原理，精准更新对应的值** ，如果了解 `React` 的原理，就会知道，只要是 `props` 或者 `state` 改变，`React` 组件就会`重新渲染`，而每一次判断是否会重新改变，值是否不一样，也是一整套算法…… 而 **Solid** 不一样，他另辟蹊径，每一个组件都是一个独立的线程，每个组件里的 `createMemo` 或 `createEffect` 里面去收集对应的依赖， 在 `set` 改变值后，都会重新执行这些方法。看起来就像是实时更新了一样。

## 三、简单使用

**Solid** 和 **React Hook** 代码风格、语法极其相似。减轻了开发者学习新框架的负担，这点还是不错的。eg：

```jsx
import { render } from "solid-js/web";
import { createSignal, createEffect, createMemo, mapArray } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);

  createEffect((prev) => {
    const sum = a() + b();
    if (sum !== prev) console.log(sum);
    return sum;
  }, 0);

  return (
    <>
      <button type="button" onClick={increment}>
        {count()}
      </button>
    </>
  );
}

render(() => <Counter />, document.getElementById("app"));
```

在线体验：[Playground](https://playground.solidjs.com/ "Solid Playground")

## 四、SolidJs 总结

- 直接使用浏览器的 `DOM`, 没有`虚拟DOM`， `DOM diff` 一整套算法
- 响应式原理，精准更新对应的值
- `提前编译`，更小的包体积，尺寸小

官网地址：[Solid](https://www.solidjs.com/ "SolidJS")

---

欢迎访问：[天问博客](https://tiven.cn/p/b2ff9578/ "天問博客") 
