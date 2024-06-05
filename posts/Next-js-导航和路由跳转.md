---
title: Next.js 导航和路由跳转
tags:
  - Node
  - NextJS
  - Router
categories:
  - React
abbrlink: c42a94ea
date: 2024-01-22 15:05:00
---

在构建现代化的 `React` 应用程序时，良好的导航和路由管理是至关重要的。`Next.js` 提供了强大的导航和路由系统，使得开发者能够轻松地实现页面之间的切换和传递数据。本文将深入介绍 `Next.js` 中的导航和路由跳转，帮助你更好地理解和应用这些功能。

![Next.js Router](https://tiven.cn/static/img/nextjs-03-_mUVReQN.jpg)

<!-- more -->

## 一、导航基础

在 Next.js 中，你可以使用 `Link` 组件进行页面间的导航。这个组件接受一个 `href` 属性，指定目标页面的路径。以下是一个基本的例子：

```jsx
import Link from 'next/link';

const NavigationExample = () => (
  <Link href="/about" legacyBehavior>
    <a>About Page</a>
  </Link>
);
```

上述代码中，我们创建了一个 `Link` 组件，将目标页面的路径指定为 `/about`。然后，我们在 `Link` 组件内部使用 `a` 标签来包装导航文本。这样，用户点击导航链接时，就会自动跳转到指定的页面。

## 二、路由参数

有时候，我们需要在路由中传递参数。`Next.js` 允许通过在路径中使用动态路由参数来实现这一点。例如：

```jsx
// pages/blog/[slug].js

import { useRouter } from 'next/router';

const BlogPost = () => {
  const { query: { slug }, pathname } = useRouter();
  console.log({ pathname, slug })
  
  return (
    <div>
      <h1>Blog Post: {slug}</h1>
    </div>
  );
};
```

在上述例子中，我们使用动态路由参数 `[slug]`，并在页面组件中通过 `useRouter` 钩子获取当前路由的参数。这样，我们就能够动态地展示对应参数的博客内容。

## 三、编程式导航

除了使用 `Link` 组件进行声明式导航外，**Next.js** 还提供了编程式导航的方式。通过 `useRouter` 钩子获取 `router` 对象，你可以在 JavaScript 代码中执行导航操作。以下是一个简单的例子：

```jsx
import { useRouter, usePathname } from 'next/navigation';

const NavigationButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navigateToAbout = () => {
    router.push('/about', { scroll: false });
    // router.replace('/about', { scroll: false });
  };

  return (
    <button onClick={navigateToAbout}>
      Go to About Page
    </button>
  );
};
```

在上述代码中，我们通过 `router.push` 方法实现了在点击按钮时跳转到 `/about` 页面的效果。这种方式适用于在事件处理函数或异步操作中进行导航。

## 四、结语

**Next.js** 提供了灵活而强大的导航和路由系统，使得构建现代 React 应用变得更加便捷。通过深入了解导航基础、路由参数和编程式导航，你可以更好地利用 Next.js 的特性，为用户提供流畅的应用体验。
希望本文对你在 **Next.js** 中处理导航和路由跳转有所帮助。如果你有任何疑问或建议，欢迎留言讨论！

参考文档：

- https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
- https://nextjs.org/docs/app/building-your-application/upgrading/codemods#new-link

---

欢迎访问：[天问博客](https://tiven.cn/p/c42a94ea/ "天问博客-专注于大前端技术")

