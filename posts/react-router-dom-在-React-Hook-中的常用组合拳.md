---
title: react-router-dom 在 React Hook 中的常用组合拳
tags:
  - React
  - Router
categories:
  - React
abbrlink: db50bb62
date: 2023-12-06 15:54:10
---

React Router DOM 是一个用于在 React 应用中实现路由功能的库。它提供了一组组件和钩子，可以帮助我们管理应用的导航和路由，结合 React Hook 的使用可以使我们的代码更加简洁和易于维护。

![React Router DOM](https://tiven.cn/static/img/react-router-01-rkA4MlgO.jpg)

[//]: # (<!-- more -->)

>使用版本：`"react-router-dom": "^6.8.2"`

## 一、安装

首先，我们需要安装 `react-router-dom`。可以使用 **pnpm** 或 **yarn** 进行安装：

```bash
pnpm add -S react-router-dom
```

## 二、常用组合拳

### 1、配置路由

在使用 `react-router-dom` 之前，我们需要先配置路由，这里我们使用 `BrowserRouter` 组件来配置路由，它是 `react-router-dom` 提供的一个路由容器，它使用 HTML5 提供的 `history` API 来保持 UI 和 URL 的同步。

```jsx
// router/index.jsx 

import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from '@/App'
import Loading from '@/components/loading'
import NotAuth from '@/pages/403'
import QuestionList from '@/pages/question/list'
import TaskAdd from '@/pages/task/add'
import TaskDetail from '@/pages/task/detail'
import TaskList from '@/pages/task/index'
import TaskIssues from '@/pages/task/issues'
import TaskVersion from '@/pages/task/version'

console.log('BASE_URL:', import.meta.env.BASE_URL)

function Routers() {
  return (
      <Suspense fallback={<Loading />}>
        <BrowserRouter
            basename={
                import.meta.env.NODE_ENV === 'production' ? '/web/' : '/'
            }
        >
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<QuestionList />}></Route>
              <Route path="/task-list" element={<TaskList />}></Route>
              <Route path="/add-task" element={<TaskAdd />}></Route>
              <Route path="/task-detail" element={<TaskDetail />}></Route>
              <Route path="/issues" element={<TaskIssues />}></Route>
              <Route path="/version" element={<TaskVersion />}></Route>
              <Route path="/403" element={<NotAuth />}></Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
  )
}

export default Routers
```

### 2、挂载使用路由

在 `main.jsx` 中，我们需要将 `Routers` 组件挂载到 `root` 节点上，这样我们的路由就可以正常使用了。

```jsx
// main.jsx

import './assets/css/style.scss'
import 'dayjs/locale/zh-cn'

import { ConfigProvider } from 'antd'
import { message } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import ReactDOM from 'react-dom/client'

message.config({
  getContainer: () => document.querySelector('.app-container'),
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={zhCN}>
      <Routers />
    </ConfigProvider>
)
```

### 3、在根组件中使用 Outlet 组件，用于渲染子路由。

在 `Routers` 组件中，我们使用 `Route` 组件来配置路由，但是在 `App` 组件中，我们需要使用 `Outlet` 组件来渲染子路由。

```jsx
// App.jsx

import { AppstoreOutlined, CodeOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [currentKeys, setCurrentKeys] = useState('question')
  const [loading, setLoading] = useState(false)

  const { userInfo, picSrc, clearUserData, getUserToken } = useUserStore()

  async function init() {
    try {
      await getUserToken()
      const ticket = new URLSearchParams(window.location.search).get('ticket')
      if (ticket) {
        navigate('/')
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(true)
    }
  }
  
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    setCurrentKeys(pathname)
  }, [pathname])
  
  return (
      <div className="app-container h-[100vh]">
        <div className="app-header"></div>
        <div className="app-body">
          {loading && <Outlet />}
        </div>
      </div>
  )
}
```

## 三、常用钩子

### 1、useNavigate

它可以帮助我们在组件中进行路由跳转。

```jsx
function App() {
  const navigate = useNavigate()
  
  function jumpTo() {
    navigate('/about')
    
    // go(1) 跳转到下一个路由
    navigate(1)
    
    // go(-1) 跳转到上一个路由
    navigate(-1) 
  }
  
}
```

### 2、useLocation

它可以帮助我们获取当前路由的信息，返回类似于 `window.location` 的数据。

```jsx
function App() {
  const { pathname, host, origin, hash } = useLocation()
  
  return (
      <div>
        <p>当前路由path：{pathname}</p>
      </div>
  )
}
```

### 3、useParams

它可以帮助我们获取动态路由参数。

```jsx
// 跳转页面,路由传参
navigate(`/detail/${id}`)

// 配置动态路由
<Route path="/detail/:id" element={<Detail />}/>

// 获取动态路由参数
import { useParams } from 'react-router-dom'
const { id } = useParams()
```

### 4、useQueryParams

它可以帮助我们获取路由查询参数。

```jsx
// 获取url参数
import { useSearchParams } from 'react-router-dom'
 
const [searchParams, setSearchParams] = useSearchParams()

// 获取参数
searchParams.get('id')

// 判断参数是否存在
searchParams.has('id')

// 同时页面内也可以用set方法来改变路由
setSearchParams({"id":2})
```

## 四、常用组件

### 1、Link

它可以帮助我们在组件中进行声明式导航，作用相当于 `a` 标签。

```jsx
import { Link } from 'react-router-dom'

<Link to="/">首页</Link>
<Link to="/about">关于</Link>
<Link to="/detail/135">详情</Link>
```

### 2、Navigate

一般用于重定向或鉴权控制。

```jsx
import { Navigate } from 'react-router-dom'
import NotAuth from '@/pages/403'

// 重定向
<Routes>
  <Route path="/" element={<Film />} />
  <Route path="/about" element={<Cinema />} />
  <Route path="/list" element={<Center />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>

// 鉴权控制
function App({ children }) {
  const { isLogin } = useUserStore()
  
  return {
    isLogin ? children : <Navigate to="/login" />
  }
}
```

### 3、Outlet

它可以帮助我们渲染子路由，类似于 Vue 中的路由插槽。

```jsx
import { Outlet } from 'react-router-dom'

function App() {
  return (
      <div className="layout">
        <Outlet />
      </div>
  )
}
```

## 五、总结

`react-router-dom` 是一个强大的路由库，结合 **React Hook** 的使用可以使我们的代码更加简洁和易于维护。通过使用 `BrowserRouter、Switch、Route、Link、useHistory、useParams 和 useLocation`，我们可以轻松地实现导航、路由跳转、传参和获取参数的功能。

---

欢迎访问：[天问博客](https://tiven.cn/p/db50bb62/ "天问博客-专注于大前端技术")

