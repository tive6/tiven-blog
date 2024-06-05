---
title: memo、useMemo、useCallback
tags:
  - React
  - JS
categories:
  - React
abbrlink: 5537ffe1
date: 2023-12-29 14:53:53
---

在 **React** 开发中，我们经常需要优化组件的性能，以提高应用程序的响应速度和效率。memo、useMemo 和 useCallback 是 React 中用于性能优化的重要工具。它们可以帮助我们避免不必要的重新渲染和函数重复创建，从而提升应用的性能。

![React && memo、useMemo、useCallback](https://tiven.cn/static/img/react-03-yrMziUoV.jpg)

<!-- more -->

## 一、memo

`memo` 是 React 提供的一个高阶组件（**Higher-Order Component**），用于优化组件的渲染。当组件的 props 没有发生变化时，memo 会缓存组件的渲染结果，并在下一次渲染时直接返回缓存的结果，从而避免不必要的重新渲染。

`memo` 的使用非常简单，只需将要进行优化的组件包裹在 memo 组件中即可。例如：

```jsx
import React, { memo } from 'react';

const MyComponent = memo((props) => {
  // 组件的渲染逻辑
});

export default MyComponent;
```

`memo` 组件会自动对组件的 props 进行浅比较，如果 props 没有发生变化，memo 会直接返回上一次渲染的结果，否则会重新渲染组件。

`memo` 的使用场景通常是在组件的 props 变化频率较低且渲染开销较大的情况下，可以有效地减少不必要的渲染，提升性能。

## 二、useMemo

`useMemo` 是 React 提供的一个 Hook，用于缓存计算结果。它接收一个计算函数和依赖项数组作为参数，并返回计算结果。当依赖项数组发生变化时，useMemo 会重新计算结果并返回，否则会直接返回上一次的缓存结果。

`useMemo` 的作用是避免重复计算昂贵的操作，从而提高应用程序的性能。它适用于那些计算量较大且结果不经常变化的情况。

使用 `useMemo` 的示例代码如下：

```jsx
import React, { useMemo } from 'react';

const MyComponent = () => {
  const result = useMemo(() => {
    // 计算逻辑
    return someValue;
  }, [dependency1, dependency2]);

  // 组件的渲染逻辑
};
```

在上面的例子中，当 dependency1 或 dependency2 发生变化时，useMemo 会重新计算结果并返回。否则，它会直接返回上一次的缓存结果。

使用 `useMemo` 可以有效地避免重复计算，提高应用程序的性能。

## 三、useCallback

`useCallback` 是 React 提供的另一个 Hook，用于缓存函数。它接收一个函数和依赖项数组作为参数，并返回一个缓存的函数。当依赖项数组发生变化时，useCallback 会返回一个新的函数，否则会返回上一次的缓存函数。

`useCallback` 的作用是避免不必要的函数重复创建，特别是在将函数作为 props 传递给子组件时，可以提高性能。

使用 `useCallback` 的示例代码如下：

```jsx
import React, { useCallback } from 'react';

const MyComponent = () => {
  const handleClick = useCallback(() => {
    // 处理点击事件的逻辑
  }, [dependency1, dependency2]);

  // 组件的渲染逻辑
};
```

在上面的例子中，当 dependency1 或 dependency2 发生变化时，useCallback 会返回一个新的函数。否则，它会返回上一次的缓存函数。

使用 `useCallback` 可以避免不必要的函数重复创建，提高应用程序的性能。

## 四、使用 memo、useMemo 和 useCallback 综合实践

`memo`、`useMemo` 和 `useCallback` 可以结合使用，以进一步优化组件的性能。

完整示例代码如下：

* 子组件 Com1.tsx：

```tsx
// src/components/com1.tsx

import {FC, memo} from "react";

const Com: FC<{ count?: number, test: ()=>void }> = ({ count,test }) => {
  console.log('re-render children Com1')
  return <div>
    Com1 --
    {count || 0}

    <br/>
    <button onClick={test}>App parent test function</button>
  </div>;
}

export default memo(Com);
```

* 子组件 Com2.tsx：

```tsx
// src/components/com2.tsx

import {memo} from "react";

const Com = () => {
  console.log('re-render children Com2')
  return <div>Com2</div>;
}

export default memo(Com);
```

* 父组件 App.tsx：

```tsx
// src/App.tsx

import './App.css';
import Com1 from "./components/com1";
import Com2 from "./components/com2";
import {useCallback, useEffect, useMemo, useState} from "react";

const App = () => {
  const [count, setCount] = useState(0);

  console.log('re-render parent App')

  // function test() {
  //   console.log('test run')
  // }

  // const test = useMemo(()=> {
  //   return () => {
  //     console.log('test run')
  //   }
  // }, [])

  const test = useCallback(()=> {
    console.log('test run')
    setCount(1000)
  }, [])

  useEffect(()=>{
    setInterval(()=>{
      // setCount(count + 1)
      // setCount((val)=>{
      //   return val + 1
      // })
    }, 1000)
  }, [])

  return (
    <div className="content">
      <h1>memo、useMemo、useCallback</h1>
      <div style={{padding: '10px 0'}}>
        <button onClick={()=>{
          setCount(100)
        }}>{count}++</button>
      </div>
      <br/>
      <Com1 { ...{test} } />
      <br/>
      <Com2 />
    </div>
  );
};

export default App;
```

## 五、总结

综上所述，`memo`、`useMemo` 和 `useCallback` 是 React 中用于性能优化的重要工具，但单独使用它们并不能保证子组件不受父组件的影响。为了确保子组件的独立性，可以考虑使用 React.memo 包裹子组件。

### 1. memo：

* 父组件重新渲染，没有被 `memo` 包裹的子组件也会重新渲染；
* 被 `memo` 包裹的组件只有在 props 改变后，才会重新渲染；
* `memo` 只会对新旧 props 做浅比较，所以对于引用类型的数据如果发生了更改，需要返回一个新的地址；
* `memo` 并不是用的越多越好，因为缓存本身也是需要开销的。如果每一个组件都用 `memo` 去包裹一下，那么对浏览器的开销就会很大，本末倒置了；
* 项目中可以针对刷新频率高的组件，根据实际情况，使用 `memo` 进行优化。

### 2. useMemo：

* `useMemo` 是对计算的结果进行缓存，当缓存结果不变时，会使用缓存结果；
* `useMemo` 并不是用的越多越好，对于耗时长、性能开销大的地方，可以使用 `useMemo` 来优化，但大多数情况下，计算结果的开销还没有使用 `useMemo` 的开销大，应视情况而定；
* 当父组件传了一个引用类型的结果 result 给子组件，且子组件用 `memo` 包裹时，需要使用 `useMemo` 对 result 进行缓存，因为 `memo` 只对 props 做浅比较，当父组件重新渲染时，会重新在内存中开辟一个地址赋值给 result，此时地址发生改变，子组件会重新渲染。

### 3. useCallback：

* `useCallback` 与 `useMemo` 类似，只不过是对函数进行缓存；
* `useCallback` 可以单独使用，但是单独使用的使用对性能优化并没有实质的提升，且父组件此时重新渲染，子组件同样会渲染；
* `useCallback` 需要配合 `memo` 一起使用，这样当父组件重新渲染时，缓存的函数的地址不会发生改变，`memo` 浅比较会认为 props 没有改变，因此子组件不会重新渲染。

---

欢迎访问：[天问博客](https://tiven.cn/p/5537ffe1/ "天问博客-专注于大前端技术")

