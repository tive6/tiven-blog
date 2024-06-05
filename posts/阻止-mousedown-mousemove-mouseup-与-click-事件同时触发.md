---
title: 阻止 mousemove 或 touchmove 与 click 事件同时触发
tags:
- JS
- DOM
- Svelte
categories:
- Svelte / Solid
abbrlink: 97d1dc4
date: 2022-10-25 16:57:20
---

最近做了自己的开源项目 [Msw-Tools](https://www.npmjs.com/package/msw-tools "msw-tools")，参考了 VConsole 工具中按钮的拖拽功能，计划给 `MSW` 按钮也增加类似的拖拽效果，并兼容PC端和手机端，但是遇到一个问题：**一个按钮绑定了多个事件，怎样才能阻止 mousemove 或 touchmove 与 click 事件同时触发**。

![MSW Tools](https://tiven.cn/static/img/img-msw-tools-VXPfB4es9pyTV62esG0rn.jpg)

[//]: # (<!-- more -->)

## 一、背景

如上图所示，实现 `MSW` 按钮拖拽要用到 **mousedown、mousemove、mouseup** 事件，对应的移动端要用到 **touchstart、touchmove、touchend** 事件，但是按钮上已经绑定了 **click** 点击事件，所以就要想办法阻止 mouse 鼠标事件或 touch 触摸事件 与 click 事件同时触发。不然每次拖拽按钮后都会触发 click 事件，这显然是不友好的。

## 二、问题解析

事件的执行顺序依次是：`mousedown > mousemove > mouseup > click`，因此，要想 mouseup 事件执行完后，不执行 click 事件，可能不太好直接处理，但是可以间接的实现。设置一个 **移动状态的开关**，并加上 **延迟处理** 就可以达到`"阻止 click 事件"`的目的。

## 三、代码实现

因为 **Msw-Tools** 工具是使用 **Svelte** 框架开发的，所以这里展示 **Svelte** 部分代码。

```html
<!-- msw.svelte -->

<div class="msw-container">
  <div on:click|stopPropagation={showModal}
       bind:this={btnDOM}
       class="msw-show">MSW</div>
</div>

<script>
  import { onMount } from "svelte";
  
  // 区分当前是PC端，还是移动端，来设置 mouse 事件 或 touch 事件
  function getModels() {
    let userAgentInfo = navigator.userAgent;
    let mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    return mobileAgents.reduce((prev, ua)=>{
      return userAgentInfo.includes(ua) || prev
    }, false)
  };
  const MSW_BTN_POSITION = '__MSW_BTN_POSITION__'

  let show = false;
  let btnDOM = null;
  let isDrop = false;
  let isMoving = false;
  let offset = {
    x: 0,
    y: 0,
  };
  let offsetDown = {};
  let dropTimer = null;
  let isMobile = getModels();
  let btnW = 0;
  let btnH = 0;
  let clientW = 0;
  let clientH = 0;
  let eventType = isMobile ? 'touchstart' : 'mousedown';

  // DOM 挂载后执行
  onMount(async () => {
    // 初始化，获取按钮、视口宽高、计算边界值
    initClientData();
    return () => {
      // component 卸载后，解除事件绑定
      btnDOM.removeEventListener(eventType, btnMousedown)
    }
  });

  function initClientData() {
    // 按钮位置保存在本地，可以记住位置，避免每次去拖拽
    let local = localStorage.getItem(MSW_BTN_POSITION)
    if (local) {
      offset = JSON.parse(local)
      btnMove()
    }
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    clientW = isMobile ? w : document.body.clientWidth
    clientH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    btnW = btnDOM.offsetWidth
    btnH = btnDOM.offsetHeight
    // 给按钮绑定 mousedown 或 touchstart 事件
    btnDOM.addEventListener(eventType, btnMousedown)
  }
  
  function eventHandle (type) {
    if (isMobile) {
      document[`${type}EventListener`]('touchmove', mousemove);
      document[`${type}EventListener`]('touchend', mouseup);
    } else {
      document[`${type}EventListener`]('mousemove', mousemove);
      document[`${type}EventListener`]('mouseup', mouseup);
    }
  }

  function showModal () {
    if (!isMoving) {
      show = true;
    }
  }

  function btnMousedown(e) {
    e = e || window.event
    isDrop = true
    offsetDown = {
      ...getOffset(e)
    };
    eventHandle('add')
  }

  function mousemove(e) {
    e = e || window.event
    if (isDrop) {
      let data = getOffset(e);
      // 判断是否移动了
      isMoving = !(offsetDown.x === data.x && offsetDown.y === data.y)
      let x = data.x - btnW / 2;
      let y = data.y - btnH / 2;
      if (x > 5 && x < (clientW-btnW - 5)) {
        offset.x = x;
      }
      if (y > 5 &&  y < (clientH-btnH - 5)) {
        offset.y = y;
      }
      if (isMoving) {
        btnMove()
      }

      clearTimeout(dropTimer);
      dropTimer = setTimeout(()=>{
        isMoving = false;
        clearTimeout(dropTimer);
        dropTimer = null;
      }, 300);
    }
  }

  function mouseup() {
    if (isDrop) {
      window.localStorage.setItem(MSW_BTN_POSITION, JSON.stringify(offset))
      eventHandle('remove')
    }
    isDrop = false
    // console.log('mouseup')
  }

  function btnMove (){
    btnDOM.style.cssText = `
    left: ${offset.x}px;
    top: ${offset.y}px;
    right: auto;
    bottom: auto;
    `
  }

  function getOffset(e) {
    return isMobile ? {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    } : {
      x: e.clientX,
      y: e.clientY,
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import "index";
</style>
```

* 效果体验：[msw-tools](https://tiven.cn/service/demos/msw-tools "msw-tools 在线演示")

---

欢迎访问：[天问博客](https://tiven.cn/p/97d1dc4/ "天问博客-专注于大前端技术")

