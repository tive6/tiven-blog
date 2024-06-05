---
title: JS中自定义事件与观察者模式
abbrlink: a5c42cd9
date: 2022-02-25 11:06:21
tags:
- JS
categories:
- JavaScript
---

**观察者模式** 也称 **发布-订阅模式** 、 **模型-视图模式** 。当对象间存在`一对多`关系时，则使用观察者模式（Observer Pattern）。比如，当一个对象被修改时，则会自动通知依赖它的对象。观察者模式属于行为型模式。

![Observer 观察者模式](https://tiven.cn/static/img/img-observer-01-SXcx4izZ5demwOo1tR3HF.jpg)

<!-- more -->

## 一、前言

**观察者模式：** 类似我们在微信平台订阅了公众号 , 当它有新的文章发表后，就会推送给我们所有订阅的人。
我们作为订阅者不必每次都去查看这个公众号有没有新文章发布，公众号作为发布者会在合适时间通知我们。
我们与公众号之间不再强耦合在一起。公众号不关心谁订阅了它， 不管你是男是女还是宠物狗，它只需要定时向所有订阅者发布消息即可。

## 二、观察者模式优缺点

**优点：**
- 可以广泛应用于异步编程，它可以代替我们传统的回调函数。
- 我们不需要关注对象在异步执行阶段的内部状态，我们只关心事件完成的时间点。
- 取代对象之间硬编码通知机制，一个对象不必显式调用另一个对象的接口，而是松耦合的联系在一起。
- 降低了目标与观察者之间的耦合关系，两者之间是抽象耦合关系。符合依赖倒置原则。

**缺点：**
1. 如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。 
2. 如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。 
3. 观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

## 三、代码实现

1. Event简易版

```js
var Event = (function() {
  let list = {};
  let listen = function(key, fn) {
    (list[key] || (list[key] = [])).push(fn);
  };
  let remove = function(key, fn) {
    let fns = list[key];
    if (!fns) return;
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        fns[i] === fn && (fns.splice(i, 1));
      }
    }
  };
  let trigger = function() {
    let keys = [].shift.call(arguments);
    let fns = list[keys];
    if (!fns || fns.length === 0) return;
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  };

  return {
    listen,
    remove,
    trigger
  };
})();

// 使用
function log(name) {
  console.log(name)
}

Event.listen('to-do', log)    // 订阅事件
Event.trigger('to-do', '111') // 111
Event.trigger('to-do', '222') // 222
Event.remove('to-do', log)    // 移除事件
Event.trigger('to-do', '333') // 不执行
```

2. 类似Nodejs的EventEmitter模拟版

```js
function EventEmitter() {
  this._maxListeners = 10;
  this._events = Object.create(null);
}

// 向事件队列添加事件
// prepend为true表示向事件队列头部添加事件
EventEmitter.prototype.addListener = function (type, listener, prepend) {
  if (!this._events) {
    this._events = Object.create(null);
  }
  if (this._events[type]) {
    if (prepend) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }
};

// 移除某个事件
EventEmitter.prototype.removeListener = function (type, listener) {
  if (Array.isArray(this._events[type])) {
    if (!listener) {
      delete this._events[type]
    } else {
      this._events[type] = this._events[type].filter(e => e !== listener && e.origin !== listener)
    }
  }
};

// 向事件队列添加事件，只执行一次
EventEmitter.prototype.once = function (type, listener) {
  const only = (...args) => {
    listener.apply(this, args);
    this.removeListener(type, listener);
  }
  only.origin = listener;
  this.addListener(type, only);
};

// 执行某类事件
EventEmitter.prototype.emit = function (type, ...args) {
  if (Array.isArray(this._events[type])) {
    this._events[type].forEach(fn => {
      fn.apply(this, args);
    });
  }
};

// 设置最大事件监听个数
EventEmitter.prototype.setMaxListeners = function (count) {
  this.maxListeners = count;
};

// 使用
var emitter = new EventEmitter();

var onceListener = function (args) {
  console.log('我只能被执行一次', args, this);
}

var listener = function (args) {
  console.log('我是一个listener', args, this);
}

emitter.once('click', onceListener);
emitter.addListener('click', listener);

emitter.emit('click', '参数');
emitter.emit('click');

emitter.removeListener('click', listener);
emitter.emit('click');
```

## 四、DOM自定义事件API

1. `Event`构造器

```js
// 创建
var customEvent = new Event('custom-event');

// 监听
window.addEventListener('custom-event', function(e) {
  // do something ...
  console.log(`事件对象：`, e)
})

// 触发
window.dispatchEvent(customEvent)
```

2. `CustomEvent`构造器，可传递参数。

```js
// 创建
var customEvent = new CustomEvent('custom-event', {
  data: {
    name: 'Tom',
    age: 18,
    other: 'otherMessage',
  }
});

// 监听
var eBox = document.getElementById('box')
eBox.addEventListener('custom-event', function(e) {
  // do something ...
  console.log(`传入的数据：`, e.data)
})

// 触发 兼容写法
if(window.dispatchEvent) {
  eBox.dispatchEvent(customEvent);
} else {
  // IE8
  eBox.fireEvent(customEvent);
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/a5c42cd9/ "天问博客")
