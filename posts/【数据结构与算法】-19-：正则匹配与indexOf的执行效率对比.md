---
title: 【数据结构与算法】(19)：正则匹配与indexOf的执行效率对比
tags:
- JS
- DSA
categories:
- 数据结构与算法
abbrlink: e4978cfe
date: 2023-07-27 01:15:35
---

在工作中经常会使用正则去匹配操作字符串，当然有时也会使用 `indexOf / includes` 去匹配字符串，但是这两个方法的性能谁会更高一筹呢？本文就来测试一下正则匹配与indexOf的执行效率。

![正则匹配 vs indexOf](https://tiven.cn/static/img/img-dsa-01-6Q5tuJKvFrD-nx9eIVizq.jpg)

[//]: # (<!-- more -->)

## 性能测试

分别用 `正则、indexOf、includes` 进行 **100万次** 匹配操作。

```typescript
const str2 = '007abcdef'
const reg = /^\d+/

console.time('reg')
for (let i = 0; i < 100 * 10000; i++) {
  reg.test(str2)
}
console.timeEnd('reg')

console.time('indexOf')
for (let i = 0; i < 100 * 10000; i++) {
  str2.indexOf('007')
}
console.timeEnd('indexOf')

console.time('includes')
for (let i = 0; i < 100 * 10000; i++) {
  str2.includes('007')
}
console.timeEnd('includes')
```

<div>
  <button style='padding: 10px 20px; color: #00b1fb;' class='rotate-btn' onclick='run()'>运行</button>
  <br>
  <b>reg run time：</b>  <span style='color: red;' class='box1-ms'>0</span>
  <hr>
  <b>indexOf run time：</b>  <span style='color: red;' class='box2-ms'>0</span>
  <hr>
  <b>includes run time：</b>  <span style='color: red;' class='box3-ms'>0</span>
  <hr>
</div>
<script>
  const str = '007abcdef'
  const reg = /^\d+/
  
  function run() {
    let s1 = performance.now()
    for (let i = 0; i < 100 * 10000; i++) {
      reg.test(str)
    }
    document.querySelector('.box1-ms').innerText = performance.now() - s1 + ' ms'

    let s2 = performance.now()
    for (let i = 0; i < 100 * 10000; i++) {
      str.indexOf('007')
    }
    document.querySelector('.box2-ms').innerText = performance.now() - s2 + ' ms'

    let s3 = performance.now()
    for (let i = 0; i < 100 * 10000; i++) {
      str.includes('007')
    }
    document.querySelector('.box3-ms').innerText = performance.now() - s3 + ' ms'
  }
</script>

* **正则匹配** 效率最低，性能最差
* **includes** 性能次之
* **indexOf** 效率最高，性能最好
* 越是底层 API，性能越好

---

欢迎访问：[天问博客](https://tiven.cn/p/e4978cfe/ "天问博客-专注于大前端技术")

