---
title: JS中节流和防抖函数的实现和区别
abbrlink: d984db1f
date: 2021-11-27 11:42:10
tags:
- JS
categories:
- JavaScript
---

在前端开发中，经常和`DOM`、`BOM`打交道，例如：窗口的resize、scroll，输入框内容校验，按钮点击等等操作时，如果事件处理函数调用的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。此时我们可以采用`throttle（节流）`和`debounce（防抖）`的方式来减少调用频率，提高性能的同时又不影响实际效果。

![Javascript 节流和防抖](https://tiven.cn/static/img/horse-wild-horse-marsh-pony-swamp-preview-GAKwS_I7uF0lsTaC0oQz4.jpg)

<!-- more -->

## 一、概念

* `函数节流( throttle )`：**高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。**
* `函数防抖( debounce )`：**触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。**
* `函数节流（throttle）`与`函数防抖（debounce）`都是为了限制函数的执行频次，以优化函数触发频率过高导致的响应速度跟不上触发频率，出现延迟，假死或卡顿的现象。

## 二、实现

1. **函数节流( throttle )**

**实现方式：** 每次触发事件时，如果当前有等待执行的延时函数，则直接return。

```js
// 节流 throttle 代码

function throttle(fn,delay) {
    let canRun = true; // 通过闭包保存一个标记
    return function () {
         // 在函数开头判断标记是否为true，不为true则return
        if (!canRun) return;
         // 立即设置为false
        canRun = false;
        // 将外部传入的函数的执行放在setTimeout中
        setTimeout(() => { 
        // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
        // 当定时器没有执行的时候标记永远是false，在开头被return掉
            fn.apply(this, arguments);
            canRun = true;
        }, delay);
    };
}
 
function log(e) {
    console.log('节流：', e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(log,500));
```

2. **函数防抖( debounce )**

- **实现方式：** 每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法。
- **缺点：** 如果事件在规定的时间间隔内被不断的触发，则调用方法会被不断的延迟。

```javascript
// 防抖 debounce 代码

function debounce(fn,delay) {
    var timeout = null; // 创建一个标记用来存放定时器的返回值
    return function (e) {
        // 每当用户输入的时候把前一个 setTimeout clear 掉
        clearTimeout(timeout); 
        // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}
// 处理函数
function run() {
    console.log('防抖：', Math.random());
}
        
//滚动事件
window.addEventListener('scroll', debounce(run, 500));
```

## 三、区别

**区别**：`节流函数`不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而`防抖函数`只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。

## 四、Lodash

`Lodash` 是一个一致性、模块化、高性能的 `JavaScript` 实用工具库。其中就封装好了节流函数 `throttle` 和防抖函数 `debounce`。

### 4-1.throttle

**参数：**

1. func (Function): 要节流的函数。
1. [wait=0] (number): 需要节流的毫秒。
1. [options=] (Object): 选项对象。
1. [options.leading=true] (boolean): 指定调用在节流开始前。
1. [options.trailing=true] (boolean): 指定调用在节流结束后。

**返回：** (Function): 返回`节流`的函数。

**例子：**

```js
// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', _.throttle(updatePosition, 100));

// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);

// 取消一个 trailing 的节流调用。
jQuery(window).on('popstate', throttled.cancel);
```

### 4-2.debounce

**参数：**

1. func (Function): 要防抖动的函数。
1. [wait=0] (number): 需要延迟的毫秒数。
1. [options=] (Object): 选项对象。
1. [options.leading=false] (boolean): 指定在延迟开始前调用。
1. [options.maxWait] (number): 设置 func 允许被延迟的最大值。
1. [options.trailing=true] (boolean): 指定在延迟结束后调用。

**返回：** (Function): 返回新的 `debounced`（防抖动）函数。

**例子：**

```js
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 
// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));
 
// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
 
// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
```

## 五、使用场景

1. `resize`事件监听浏览器屏幕宽高，自适应适配操作
2. `scroll`事件监听屏幕滚动，如：导航栏/Tab栏动态置顶、下拉刷新、上划加载更多
3. 表单的input事件查询接口获取数据
4. tab切换频率控制，防止频繁点击过快
5. Echart图表中`tooltip.formatter`方法

## 六、总结

**1.节流**：使得一定时间内只触发一次函数。原理是通过判断是否有延迟调用函数未执行。
**2.防抖**：将多次操作合并为一次操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。

---

欢迎访问：[天问博客](https://tiven.cn/p/d984db1f/ "天問博客")
