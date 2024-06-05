---
title: React + valtio 响应式状态管理
tags:
- Valtio
- React
categories:
- React
abbrlink: b10a02ec
date: 2023-10-13 17:02:21
---

**Valtio** 是一个很轻量级的响应式状态管理库。**valtio** 让数据管理在 React 和原生 JS (`Vanilla`) 中变得更加简单的一个库，它类似于 **Vue** 的数据驱动视图的理念，使用外部状态代理去驱动 **React** 视图来更新。

![React + Valtio](https://tiven.cn/static/img/react-05-A2AqTp0v.jpg)

<!-- more -->

## 一、状态管理库

* `dispatch` 流派(单向数据流-中心化管理)：`redux`、`zustand`、`dva` 等
* 响应式流派(中心化管理)：`mobx`、`valtio` 等
* 原子状态流派(原子组件化管理)：`recoil`、`jotai` 等

值得一提的是：`Jotai`、`Zustand`、`Valtio` 这三个开源状态管理库都是出自一人之手。
zustand 德语 "状态"，jotai 日语 "状态"、valtio 芬兰语 "状态"。
作者叫做 **Daishi Kato**，他是日本东京人，是个全职开源作者。

## 二、`Jotai`、`Zustand`、`Valtio` 使用对比

* Zustand


```jsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default function Counter() {
  const count = useStore((state) => state.count);
  const inc = useStore((state) => state.inc);

  return (
    <div>
      {count}
      <button onClick={inc}>+1</button>
    </div>
  );
}
```

* Jotai：每个状态都是原子化，用法和原生的 useState 有点像

```jsx
import { atom, useAtom } from "jotai";

const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      {count}
      <button onClick={() => setCount((v) => v + 1)}>+1</button>
    </div>
  );
}
```

* Valtio：和 Vue 的响应式类似，当数据发生变化的时候就驱动视图更新

```jsx
const state = proxy({
  dur: 10,
  count: 1102
});
const incDur = () => {++state.dur};
const decDur = () => {--state.dur};
const incCount = () => {
  ++state.count;
  setTimeout(incCount, 100 * state.dur);
};

incCount();

export default function Main() {
  const snap = useSnapshot(state)

  return (
      <div>
        <h3>{snap.dur}</h3>
        <button
            disabled={snap.dur <= 1}
            onClick={decDur}>
          -
        </button>
        <button
            disabled={snap.dur >= 10}
            onClick={incDur}>
          +
        </button>
      </div>
  );
}
```

## 三、Valtio 状态管理最佳实践

1. 创建一个 `store.js` 文件

```js
import { proxy } from 'valtio'
import { useProxy } from 'valtio/utils'
import { cloneDeep } from 'lodash-es'

export const defaultData = {
  activeIndex: 0,
  rangeData: [5, 20],
  baseSelected: [],
  step: {
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  },
}

const state = cloneDeep(defaultData)
const store = proxy(state)

export const useStore = () => {
  return useProxy(store)
}

export function resetData() {
  Object.entries(defaultData).forEach(
    ([key, value]) => {
      store[key] = cloneDeep(value)
    }
  )
}
```

2. 在组件中使用

```jsx
import { useStore, resetData } from '@/store/store'

const tabs = [
  {
    value: '1',
    label: '基础设置',
  },
  {
    value: '2',
    label: '高级设置',
  },
  {
    value: '3',
    label: '其他设置',
  }
]

const list = [
  {
    value: '1',
    label: '标签'
  },
  {
    value: '2',
    label: '分类'
  },
  {
    value: '3',
    label: '作者'
  },
]

export default function Main() {
  const store = useStore()

  useEffect(() => {
    return () => {
      // 在组件卸载的时候重置数据
      resetData()
    }
  }, []);

  function onSelect(id) {
    if (store.baseSelected.includes(id)) {
      store.baseSelected =
          store.baseSelected.filter(
              (item) => item !== id
          )
    } else {
      if (store.baseSelected.length >= 5) return
      store.baseSelected.push(id)
    }
  }
    
  return (
    <div>
      {
        tabs.map(({ value, label }, index) => (
          <div
            key={value}
            onClick={() => {
              store.activeIndex = index
            }}
          >
            {label}
          </div>
        ))
      }
      <hr/>
      {
        list.map(({ value, label }) => (
          <div
            key={value}
            onClick={() => {
              onSelect(value)
            }}
          >
            {label}
          </div>
        ))
      }
    </div>
  );
}
```

`useProxy` 其实就是对取 `useSnapshot()` 或 `store` 数据的封装，这个 hook 也很简单，就是判断是渲染期间(渲染体内)就返回 `useSnapshot()` 的快照数据，非渲染期间(非渲染体内)就返回原始的 store 数据，和我们自己手写的是差不多的，只不过这个 hook 帮我们把这个过程封装了起来。

官方文档：https://valtio.pmnd.rs/

---

欢迎访问：[天问博客](https://tiven.cn/p/b10a02ec/ "天问博客-专注于大前端技术")

