---
title: Svelte 实现 keypress 快捷键功能
tags:
- Vite
- Svelte
- JS
categories:
- Svelte / Solid
abbrlink: d6319ec7
date: 2022-11-17 15:44:54
---

有些框架中内置了常用的事件修饰符和按键修饰符，例如：**Vue** 中就提供了按键 `.enter`（`.13`），修饰键 `.ctrl`、`.alt`、`.shift`、`.meta`等修饰符，简化了很多快捷键功能的实现。在 **Svelte** 中也提供了 `preventDefault`、`stopPropagation`、`once` 等事件修饰符，但是没有内置快捷键修饰符。

![Svelte Keypress](https://tiven.cn/static/img/img-svelte-01-hhx5v16WhRd3jTpXst242.jpg)

<!-- more -->

## 一、Svelte 事件修饰符

在 **Svelte** 中使用 `|` 字符为 DOM 事件添加修饰符。可以使用的修饰符有：

|修饰符|作用|
|---|---|
|preventDefault|在程序运行之前调用 `event.preventDefault()`|
|stopPropagation|调用 `event.stopPropagation()`, 防止事件到达下一个标签|
|passive|改善了 `touch/wheel` 事件的滚动表现（Svelte 会在合适的地方自动加上它）|
|capture|表示在 `capture` 阶段而不是 `bubbling` 触发其程序|
|once|程序运行一次后删除自身|
|self|仅当 `event.target` 是其本身时才执行|

例：带 `once` 修饰符的事件处理程序只运用一次。

```html
<script>
  function handleClick() {
    alert('只提示一次')
  }
</script>

<button on:click|once={handleClick}>
  点击
</button>
```

## 二、Svelte 实现快捷键

>`<svelte:window>` 标签允许你添加事件监听到 window 对象，从而不用担心移除它时 component 被毁，或者在服务端渲染时检查是否存在于 window。

实现 `Esc` 关闭弹窗和 `Ctrl+S` 提交保存的快捷键。

```html
<svelte:window on:keydown={handleKeydown}/>

{#if show }
  <div class="box"></div>
{/if}
  
<script>
  let show = false
  
  function handleKeydown(e) {
    let {
      keyCode,
      ctrlKey,
    } = e
    // Esc 关闭
    if (keyCode===27) show = false
    // Ctrl + S 提交保存
    if (ctrlKey && keyCode === 83) {
      save()
      // 阻止浏览器默认的保存网页功能
      e.preventDefault()
    }
  }
  
  function save() {
    // do something
  }
</script>
```

---

欢迎访问：[天问博客](https://tiven.cn/p/d6319ec7/ "天问博客-专注于大前端技术")

