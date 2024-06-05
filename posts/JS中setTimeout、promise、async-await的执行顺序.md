---
title: JS中setTimeout、promise、async、await的执行顺序
abbrlink: 4d100461
date: 2021-10-09 10:55:45
tags:
- Async
- EventLoop
- JS
categories:
- JavaScript
---

我们都知道，`Javascript`是`单线程`语言，也就是说，同一个时间只能做一件事。这就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。
因为任务有`同步`与`异步`之分，所以不同任务的执行必定有一定的顺序。

![JavaScript](https://tiven.cn/static/img/img-js-03-fs67PSGCGxT3ZB1PBaDhg.jpg)

[//]: # (<!-- more -->)

## Event Loop（事件循环）

* 所有任务可以分成两种：

1. `同步任务`（synchronous）：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
2. `异步任务`（asynchronous）：不进入主线程、而进入`任务队列`（task queue）的任务，只有`任务队列`通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

* 异步执行的运行机制：（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

1. 所有`同步任务`都在`主线程`上执行，形成一个`执行栈`（execution context stack）。
2. 主线程之外，还存在一个`任务队列`（task queue）。只要异步任务有了运行结果，就在`任务队列`之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取`任务队列`，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

**定义：** `主线程`循环不断的从`任务队列`中读取事件（`任务`），这整个过程就称为`Event Loop`（`事件循环`）。

## JavaScript事件

**概述：** `任务队列`是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在`任务队列`中添加一个事件，表示相关的异步任务可以进入`执行栈`了。主线程读取`任务队列`，就是读取里面有哪些事件。

JavaScript的事件分两种，`宏任务`(macro-task)和`微任务`(micro-task)

1. `宏任务`：从上到下、从左到右、顺序执行的script代码，setTimeout，setInterval，setImmediate(node环境)
2. `微任务`：Promise.then(非new Promise)，async/await整体，process.nextTick(node环境)
3. 其他异步任务：
   * `requestAnimationFrame(callback)` - **RAF** 仅仅存在于浏览器环境，执行时机在 `setTimeout` 之前执行
   * `queueMicrotask`：执行时机在第一轮`同步任务`执行完成之后，`微任务`执行之前。

## setTimeOut

`setTimeOut`执行需要满足两个条件：

1. 主进程必须是空闲的状态，如果到时间了，主进程不空闲也不会执行你的回调函数
2. 这个回调函数需要等到插入异步队列时前面的异步函数都执行完了，才会执行

**注意：** `setTimeOut`并不是直接的把回调函数放进异步队列中，而是在定时器的时间到了之后，把回调函数放到执行异步队列中去。如果此时这个队列已经有很多任务了，那就排在他们的后面。这也就解释了为什么setTimeOut为什么不能精准的执行的问题了。

## promise、async/await

* `new Promise`是`同步`的任务，会被放到`主进程`中去立即执行。
* `.then()`函数是异步任务会放到`异步队列`中去，具体就是当promise状态结束（`fulfilled`）的时候，会立即放进`异步队列`中去。
* 带`async`关键字的函数会返回一个`promise`对象，如果里面没有`await`，执行起来等同于`普通函数`。
* `await`关键字要在 `async` 关键字函数的`内部`，`await` 写在外面会报错。`await`如同他的语意，就是在等待，等待右侧的表达式完成。
* `await`会让出线程，阻塞`async`内后续的代码，先去执行`async`外的代码。等外面的同步代码执行完毕，才会执行里面的后续代码。就算await的不是`promise`对象，是一个`同步函数`，也会同样执行。

## 执行顺序（总结）：

>1. 宏任务（从上到下、从左到右的整体）
>2. 微任务的Event Queue（Promise.then，async / await整体，process.nextTick【node环境】）
>3. 宏任务的Event Queue（setTimeout / setInterval / setImmediate【node环境】）
>4. 同一轮`微任务队列`中，依次顺序执行 `process.nextTick` 、`queueMicrotask`、`Promise.then`和`async/await`
>5. 同一轮`宏任务队列`中，`setImmediate` 在 `setTimeout` 之后执行
>6. 在`浏览器环境`同一轮任务队列中，`requestAnimationFrame` 在 `setTimeout` 之前执行

## 经典面试题：

### 1、setTimeout + promise

* 例1：

```js
;(function() {
    console.log(1);
    setTimeout(() => {
        console.log(2);
        Promise.resolve().then(data => {
          console.log(3);
        });
    });
    new Promise((resolve) => {
        resolve();
        console.log(4);
    }).then(() => {
        console.log(5);
        setTimeout(() => {
          console.log(6);
        });
    }).then(() => console.log(7));
    console.log(8);
})();
```

* 输出：

```text
1
4
8
5
7
2
3
6
```

* 例2：

```js
function asyncFn() {
    console.log(1);
    Promise.resolve().then(data => {
      console.log(2);
    });
    console.log(3);
}

setTimeout(() => {
  asyncFn();
}, 20);
```

* 输出：

```text
1
3
2
```

### 2、setTimeout + promise + async + await

* 例3：

```js
;(function() {
    async function async1 () {
        console.log("async1 start");
        await async2();
        console.log("async1 end");
    }
    
    async function async2 () {
        console.log("async2");
    }
    
    console.log("script start");
    setTimeout(() => {
        console.log("setTimeOut");
    }, 0);
    async1();
    new Promise(function(reslove) {
        console.log("promise1");
        reslove();
    }).then(function() {
        console.log("promise2");
    });
    console.log("script end");
})();
```

* 输出：

```text
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeOut
```

### 3、setTimeout + promise + async + await + setImmediate + process.nextTick

* 例4（在`node`环境中）：

```js
console.log('global');

setTimeout(function() {
  console.log('timeout1');
  process.nextTick(function() {
    console.log('timeout1_nextTick');
  })
  new Promise(function(resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function() {
    console.log('timeout1_then')
  })
})

setImmediate(function() {
  console.log('immediate1');
  process.nextTick(function() {
    console.log('immediate1_nextTick');
  })
  new Promise(function(resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function() {
    console.log('immediate1_then')
  })
})

process.nextTick(function() {
  console.log('global_nextTick');
})

new Promise(function(resolve) {
  console.log('global_promise');
  resolve();
}).then(function() {
  console.log('global_then')
})

setTimeout(function() {
  console.log('timeout2');
  process.nextTick(function() {
    console.log('timeout2_nextTick');
  })
  new Promise(function(resolve) {
    console.log('timeout2_promise');
    resolve();
  }).then(function() {
    console.log('timeout2_then')
  })
})

process.nextTick(function() {
  console.log('global2_nextTick');
})

new Promise(function(resolve) {
  console.log('global2_promise');
  resolve();
}).then(function() {
  console.log('global2_then')
})

async function async1() {
  console.log('async_1')
}

;!async function() {
  await async1()
  console.log('async_await')
}();

setImmediate(function() {
  console.log('immediate2');
  process.nextTick(function() {
    console.log('immediate2_nextTick');
  })
  new Promise(function(resolve) {
    console.log('immediate2_promise');
    resolve();
  }).then(function() {
    console.log('immediate2_then')
  })
})
```

* 输出：

```text
global
global_promise
global2_promise
async_1
global_nextTick
global2_nextTick
global_then
global2_then
async_await
timeout1
timeout1_promise
timeout1_nextTick
timeout1_then
timeout2
timeout2_promise
timeout2_nextTick
timeout2_then
immediate1
immediate1_promise
immediate1_nextTick
immediate1_then
immediate2
immediate2_promise
immediate2_nextTick
immediate2_then
```

## 总结

1. script
2. process.nextTick （node环境）
3. queueMicrotask
4. promise.then / async|await
5. requestAnimationFrame （浏览器环境）
6. setTimeout
7. setImmediate （node环境）

参考文档：
* http://www.ruanyifeng.com/blog/2014/10/event-loop.html

---

欢迎访问：[天问博客](https://tiven.cn/p/4d100461/ "天问博客-专注于大前端技术")
