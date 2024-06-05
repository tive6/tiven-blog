---
title: 曲线救国，让ChatGPT生成图片
tags:
- ChatGPT
categories:
- ChatGPT
abbrlink: 147dae19
date: 2023-05-22 18:27:29
---

众所周知，**ChatGPT** 是一个很强大的大型语言模型，但是只能回复 **文本类** 的信息。如果想让 **ChatGPT** 生成图片，当然也是有办法曲线救国的。

![ChatGPT生成图片](https://tiven.cn/static/img/img-chatgpt-01-bhziLBavdqF9EORB6Nich.jpg)

[//]: # (<!-- more -->)

## 前言

直接ChatGPT生成图片，正常情况下会得到这种结果：

问：`生成一张关于故宫的图片`
答：`很抱歉，作为一个文本模型，我无法直接生成图片。然而，你可以通过使用图片编辑工具或搜索引擎来找到关于故宫的图片。只需在搜索引擎中输入"故宫"，就能找到许多美丽的图片，展示这座古老而壮观的建筑。`

## 曲线救国

借助 `Unsplash API`，使得 `Chatgpt` 直接在对话的聊天框中输出图片。

**Unsplash API：** 是一个基于 REST 的 API，它提供了丰富的图像数据和功能。在这里，通过使用 Unsplash API，这就可以让Chatgpt可以通过编程方式搜索、浏览和下载 Unsplash 平台上的图像，从而实现在聊天对话中的预览。

## ChatGPT生成图片的指令模板

**新建一个会话**，复制以下指令之后， **ChatGPT** 就可以"生成"返回图片。

```
接下来我会给你指令，生成相应的图片，我希望你用Markdown语言生成，不要用反引号，不要用代码框，你需要用Unsplash API，遵循以下的格式：https://source.unsplash.com/1600x900/?< PUT YOUR QUERY HERE >。你明白了吗？
```

接下来的对话，**ChatGPT** 就可以愉快的"生成"图片了。

![ChatGPT生成图片](https://tiven.cn/static/img/img-chatgpt-02-h9iFA8yhw8Q9_SQTN_lzM.jpg)


---

欢迎访问：[天问博客](https://tiven.cn/p/147dae19/ "天问博客-专注于大前端技术")

