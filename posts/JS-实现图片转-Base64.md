---
title: JS 实现图片转 Base64
tags:
- JS
- Echarts
categories:
- JavaScript
abbrlink: 4ebf7f7c
date: 2023-05-30 11:16:34
---

使用 **ECharts** 开发可视化图表，经常会遇到使用 **base64** 图片的情况，所以这里就使用 js 提供的 `FileReader` 对象实现一个图片转 **base64** 的小功能。

![图片转base64](https://tiven.cn/static/img/img-base64-01-13z7sRy6yG9yaUCseeQmi.jpg)

<!-- more -->

## 上代码

效果如上图所示：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>图片转base64</title>
</head>
<body>

<input type="file" id="image-input">
<br><br>
<textarea style="width: 800px;" id="base64-textarea" rows="20" cols="50"></textarea>

<script>
  // 创建一个函数，接受一个图片文件作为参数
  function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      // 创建一个 FileReader 对象
      const reader = new FileReader();

      // 当读取完成时触发 onload 事件
      reader.onload = () => {
        // 将图片转换为 Base64 字符串
        const base64String = reader.result;
        resolve(base64String);
      };

      // 读取文件内容
      reader.readAsDataURL(file);
    });
  }

  // 选择图片文件的 input 元素
  const inputElement = document.getElementById('image-input');
  // 显示 Base64 字符串的文本域元素
  const textareaElement = document.getElementById('base64-textarea');

  // 监听 input 元素的 change 事件
  inputElement.addEventListener('change', async (event) => {
    // 获取选择的图片文件
    const file = event.target.files[0];

    try {
      // 调用函数将图片转换为 Base64
      const base64String = await convertImageToBase64(file);
      // 将 Base64 字符串显示在文本域中
      textareaElement.value = base64String;
    } catch (error) {
      console.error(error);
    }
  });

</script>
</body>
</html>
```

## 在线体验

<iframe style="width: 100%; height: 400px; box-sizing: border-box;"
        src="/demos/pic-to-base64.html" frameborder="0">
    <p>Your browser does not support iframes.</p>
</iframe>

---

欢迎访问：[天问博客](https://tiven.cn/p/4ebf7f7c/ "天问博客-专注于大前端技术")

