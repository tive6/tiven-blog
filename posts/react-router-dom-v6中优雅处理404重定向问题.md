---
title: react-router-dom v6中优雅处理404重定向问题
tags:
- React
- Router
categories:
- React
abbrlink: ad2baab8
date: 2023-08-30 15:56:55
---

在基于React的单页面应用（SPA）中，使用 `react-router-dom` 库来管理路由是一项关键任务。当用户访问一个不存在的页面时，我们通常希望能够以优雅的方式处理404情况，从而提升用户体验。本文将探讨如何在React应用中使用react-router-dom的v6版本来优雅地处理404重定向问题，并为你的项目增添一份专业的风采。

![React](https://tiven.cn/static/img/img-react-01-awodTve6vGeownJ6xi27U.jpg)

[//]: # (<!-- more -->)

## 一、安装与基本设置

首先，确保你的项目已经安装了 `react-router-dom` 的 **v6** 版本：

```bash
pnpm add react-router-dom@6
```

接着，在主应用组件中进行基本的路由配置，包括404的重定向：

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';

import Home from './Home';
import About from './About';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> {/* 所有未匹配路由都重定向到404页面 */}
      </Routes>
    </Router>
  );
}

export default App;
```

## 二、创建404页面

为了提供更好的用户体验，我们需要创建一个专门的404页面组件，用于显示当用户访问不存在的页面时的内容：

```jsx
import React from 'react';

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
```

## 三、两种404重定向方案

### 1. 重定向到404页面

通过在主应用组件中使用 `<Route path="*" element={<NotFound />} />` 配置，我们可以将所有未知路径都重定向到自定义的404页面，为用户提供明确的错误提示。

### 2. 重定向到首页

如果你更倾向于将用户引导回首页，可以使用导航元素 `<Navigate to="/" replace />` 将所有未匹配路由重定向到首页。代码演示：

```jsx
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* 所有未匹配路由都重定向到首页 */}
      </Routes>
    </Router>
  );
}
```

## 四、实践经验与提升

1. 导航链接： 无论是重定向到404页面还是首页，都可以在404页面上添加导航链接，使用户能够轻松返回其他页面。
2. 定制404页面： 根据你的应用风格，定制404页面的样式和内容，以保持一致的用户体验。
3. 动画效果： 为404页面添加过渡动画效果，能够使页面切换更加平滑，提升用户感知。
4. React组件库： 如果你使用了UI组件库，可以在404页面中继续使用这些组件，保持一致的设计风格。

## 五、总结

通过合理配置 `react-router-dom` 的 **v6** 版本，我们能够在React应用中优雅地处理404重定向问题。无论是重定向到专门的404页面还是引导用户返回首页，都能够提升用户体验，为应用增添专业的形象。通过定制内容、样式、动画和组件，我们可以为用户呈现出更加友好和专业的404页面，从而提升整体用户体验。

---

欢迎访问：[天问博客](https://tiven.cn/p/ad2baab8/ "天问博客-专注于大前端技术")

