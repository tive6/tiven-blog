---
title: 阻止移动端 touchmove 与 scroll 事件冲突
tags:
- JS
- DOM
categories:
- H5
abbrlink: aaf7a91b
date: 2022-11-10 10:49:23
---

在移动端开发过程中，如果要实现一个元素或按钮的拖动定位，会出现很多坑。例如：元素上下移动过程中，会触发 **body** 的 **scroll** 事件，导致整体的位置偏移，这时就需要 **阻止移动端 touchmove 与 scroll 事件冲突** 。

![DOM Touchmove Scroll](https://tiven.cn/static/img/img-js-03-fs67PSGCGxT3ZB1PBaDhg.jpg)

<!-- more -->

## 一、解决思路

1. 当移动端 touchmove 与 scroll 事件冲突时，首先想到的就是在 touchmove 事件监听过程中阻止默认事件(`e.preventDefault()`)。
2. 如果你这样做了，紧接着你就会看到控制台的报错：`[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.`
3. 然后通过 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener "addEventListener") ，得知 `addEventListener` 方法的第三个参数 `options` 有很多可选配置。
4. **options** 是一个指定有关 `listener` 属性的可选参数对象。可用的选项如下：

|参数|定义|
|---|---|
|capture|一个布尔值，表示 `listener` 会在该类型的事件捕获阶段传播到该 `EventTarget` 时触发。|
|once|一个布尔值，表示 `listener` 在添加之后最多只调用一次。如果为 `true`，`listener` 会在其被调用之后自动移除。|
|passive|一个布尔值，设置为 `true` 时，表示 `listener` 永远不会调用 `preventDefault()`。如果 `listener` 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。查看 [使用 passive 改善滚屏性能以了解更多](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E4%BD%BF%E7%94%A8_passive_%E6%94%B9%E5%96%84%E6%BB%9A%E5%B1%8F%E6%80%A7%E8%83%BD "passive 改善滚屏性能")。|
|signal|AbortSignal，该 `AbortSignal` 的 `abort()` 方法被调用时，监听器会被移除。|

## 二、问题所在

因为将 `passive` 设为 `true` 可以启用性能优化，并可大幅改善应用性能，所以大部分浏览器（Safari 和 Internet Explorer 除外）将文档级节点 **Window、Document 和 Document.body 上的 wheel、mousewheel、touchstart 和 touchmove 事件的 passive 默认值更改为 true** 。如此，事件监听器便不能取消事件，也不会在用户滚动页面时阻止页面呈现。
因此，当你想要覆盖这一行为并确认 `passive` 在所有浏览器中都被设为 `false`，你必须显式地将其设为 `false`，而不是依赖浏览器的默认设置。

* 关键代码：

```js
document.addEventListener('touchmove', touchmove, {
  passive: false,
})

function touchmove(e) {
  e = e || window.event
  // do something
  e.preventDefault()
}
```

参考文档：
* https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener

---

欢迎访问：[天问博客](https://tiven.cn/p/aaf7a91b/ "天问博客-专注于大前端技术")

