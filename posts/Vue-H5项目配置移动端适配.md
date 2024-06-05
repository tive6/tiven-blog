---
title: Vue项目配置rem移动端适配
abbrlink: b1ab6b72
date: 2021-11-04 15:34:58
tags:
- Vue
- Hybrid
- H5
categories:
- H5
---

现在市面上移动设备大小各异，为了统一的产品形态和良好的用户体验，所以在做移动H5项目时，需要考虑到移动端适配问题。本文就讲讲`Vue`+H5项目配置`rem`移动端适配。

![Vue+H5适配](https://tiven.cn/static/img/img-h5-01-lFMZWNDKk29kzxcgvXOrg.jpg)

<!-- more -->

## 一、项目介绍

* 脚手架CLI：`@vue/cli`
* Vue版本：`2.6.11`
* 移动UI组件库：`Vant#2.10.14`
* CSS预处理器：`sass`

## 二、配置`lib-flexible`插件

* 下载插件

```sh
npm i -D lib-flexible
```

* 导入：在`src/main.js`中使用

```js
import 'lib-flexible'
```

## 三、项目配置

* 安装`postcss-pxtorem`和`postcss-loader`插件依赖

```sh
npm i -D postcss-pxtorem postcss-loader
```

* 在根目录下新建 `.postcssrc.js` 文件，配置如下：

```js
// .postcssrc.js
module.exports = {
  'plugins': {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 5,
      propList: ['*'],
      exclude: /node_modules|vant/i,  // 排除 node_modules 和 vant 中的样式，不转 rem  
    }
  }
}
```

`postcss-pxtorem` [使用文档](https://npmmirror.com/package/postcss-pxtorem)，所有参数如下：

```js
{
    rootValue: 37.5,
    unitPrecision: 5,
    propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0,
    exclude: /node_modules/i
}
```

* 使用`Vite`脚手架工具构建的Vue项目，配置同上

#### 参数解释

* `rootValue`：这个值是一个计算单位，相当于 `1rem = 75px`
* `exclude`：是一个正则表达式，忽略 rem 编译检查的目录，上边的配置是要把`node_modules`和`vant`目录排除，此文件中的`px`不需要转`rem`。如果还有其他目录需要忽略的在此添加就可以。
* `rootValue` 的值是根据UI设计稿的页面宽度来定，现在通用的尺寸有`750px`和`375px`两种。如下配置仅供参考：

|设计稿宽度|参数值|UI尺寸|CSS样式|
|:---:|:---:|:---:|:---:|
|375px|37.5|20px|20px|
|375px|75|12px|24px|
|750px|75|32px|32px|

**注意：**

1. 此方法对于`内联样式`和`:style`属性中的动态样式不生效。
2. 对于`px值`比较`小`的转换不友好，因为`px`转成`rem`后，值是很小的小数。例如：`1px的border`转换后有些机型直接不展示，还有使用`border-radius`绘制的小圆圈或小圆点，转换后估计是个椭圆。例：

```css
.border {
    border: 1px solid #ddd;
}

.dot {
    width: 8px;
    height: 8px;
    background-color: #00b1fb;
    border-radius: 4px;
}
```

3. 解决方法比较简单，对于比较`小尺寸`的可以忽略转换（当然也可以使用`transform+scale`来实现）。
4. 忽略转换可以加注释`/* no */`，或者使用大写的`PX`，具体如下：

```css
/* 忽略写法 1 */
.border {
    border: 1PX solid #ddd;
}

/* 忽略写法 2 */
.border {
    border: 1px solid #ddd; /* no */
}

.dot {
    width: 8px; /* no */
    height: 8px; /* no */
    background-color: #00b1fb;
    border-radius: 4px; /* no */
}
```

---

欢迎访问：[天问博客](https://tiven.cn/p/b1ab6b72/ "天問博客") 
