---
title: echarts.graphic.LinearGradient 生成渐变色
tags:
- JS
- Echarts
categories:
- Echarts
abbrlink: e03449a3
date: 2023-04-05 10:22:31
---

三年疫情已经远去，**大数据** 已被千家万户所熟知。随着大数据的流行，很多公司数据大屏到处可见。作为前端开发，也面对着各式各样花里胡哨的UI设计，会经常遇到一个图表配上各种渐变色。本文就讲讲在 Echarts 中如何配置渐变色。

![echarts 渐变色](https://tiven.cn/static/img/img-echarts-02-YhrPDdayyEs4yTkGRJHs6.jpg)

<!-- more -->

## 前言

众所周知，echarts 默认是以 Canvas 为画布绘制各种图形的。所以不能用 CSS3 的方式设置渐变色。
有需求当然就会有解决办法，echarts 内置了 `echarts.graphic` 渐变生成器。

## echarts.graphic.LinearGradient 

示例：

```js
new echarts.graphic.LinearGradient(
    0, 0, 0, 1, 
    [
        { offset: 0, color: '#fff' },
        { offset: 0.5, color: '#f00' },
        { offset: 1, color: '#00f' }
    ] 
)
```

参数说明：
1. 前四个参数用于配置渐变色的起止位置，这4个参数依次对应 **右 / 下 / 左 / 上** 四个方位，上边 0 0 0 1 则表示是从上到下的渐变。
2. 第5个参数则是一个数组，用于配置颜色的渐变过程，每一项为一个对象，包含 offset 和 color 两个参数。offset 的范围是 0 ~ 1 ， 用于表示位置，color 表示颜色。
3. 以上生成的渐变色用 CSS3 来写就是这样：

```css
.box {
    background: linear-gradient(#fff 0%, #f00 50%, #00f 100%);
}
```

## echarts 渐变色配置示例

简单封装一下 `echarts.graphic.LinearGradient` 方法

```js
// common/utils.js

export default {
  /* 获取 echarts 渐变色 */
  getEChartsLinearColors(params = {}) {
    const ps = params.position || [0, 0, 0, 1]; // [右,下,左,上]
    return new echarts.graphic.LinearGradient(
        ...ps,
        [
          {offset: 0, color: params.colors[0]}, {offset: 1, color: params.colors[1]},
        ],
    );
  },
}
```

echarts 配置：

```js
import Utils from '@/common/utils';

const lineOptions = {
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100,
      moveOnMouseMove: false,
    },
    {
      type: 'slider',
      height: 6,
      bottom: 20,
      showDetail: false,
      showDataShadow: false,
      orient: 'horizontal',
      borderColor: 'rgba(255, 255, 255, 0)',
      // 渐变色 start
      fillerColor: Utils.getEChartsLinearColors({
        position: [0, 0, 1, 0],
        colors: [
          '#97CCFE', '#AF6AFF',
        ],
      }),
      // 渐变色 end
      brushSelect: false,
    },
  ],
  tooltip: {
    show: true,
    confine: true,
    extraCssText: 'z-index: 10',
    backgroundColor: 'rgba(40,102,120,0.34)',
    borderColor: 'rgba(39, 17, 13, 0)',
  },
  series: [
    {
      symbol:
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAaxJREFUSA21lrFOwzAQhmOE2Io68QJUHWGBla0TUjeegYHnYeAZ2Cp16sZKFxij8gJMFd1Ywv9FNoqbcxJK8ku/bF/u7nfts12XNaAoilN9nooTcSyORLATt+JGzJ1zX2pNOMuqxCS6ES9E06cSV6j/Lr5ICOEItWAlZ8Zz8STybB98y2UhkbzqGgko+bU+zqoOB/RXEnkNcUeh42f+3+Skm/lcZepSQAbWnGXpC3OfMzv2GdnQpjW/0nd45v0/1a49vSlqyEXOpZMSpfggRvuhMeCX3YnnDAx8yPYs1qpHNqrrkSWiaqzkMjcm5zvCTMACOacIcIgssCSpmVf98cHXwgQBTqiFVNBffMcIhOO/Hxg2dN9ujVO+IwQGBQJWBSBKKXZFyneHALeiBeq8K1K+WwS4ci0QRJ23AZ+UwAYBbj8OhQUOUZNIOGhWLDnz8oDpNN9qcGl5eRslC0O1tF0VhL3pVl0GAUr1Xmy6jwjqCt6GJx4gliijo2ZBvyfw8JTVWQqQVAb2YtWDAA/O76tWu+S0H1x+wzyZYfb+sRjm0Q8itP6t4Bcd/LflBy3hc3EFl3JYAAAAAElFTkSuQmCC',
      showSymbol: false,
      symbolSize: 10,
      selectedMode: 'single',
      emphasis: {
        lineStyle: {
          width: 2,
        },
      },
      select: {
        disabled: true,
      },
      data: [123, 2115, 518, 8418, 1894, 960],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 2,
        shadowColor: '#AAA9FC',
        shadowOffsetY: 0,
        // 渐变色 start
        color: Utils.getEChartsLinearColors({
          position: [0, 0, 0, 1],
          colors: [
            '#AB7DFD', '#B5DCFD',
          ],
        }),
        // 渐变色 end
        shadowBlur: 5,
      },
    },
  ],
};
```

上边 **echarts** 配置了 `lineStyle.color` 和 `dataZoom fillerColor` 渐变色，最后展示效果如上图所示。

---

欢迎访问：[天问博客](https://tiven.cn/p/e03449a3/ "天问博客-专注于大前端技术")

