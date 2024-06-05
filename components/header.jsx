import { useReactive } from 'ahooks'
import { Tabs } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useStore } from '@/store'

const tabsData = [
  {
    key: '/',
    // label: (
    //   <Link href="/" legacyBehavior>
    //     <a className="text-#66b1ff">首页</a>
    //   </Link>
    // ),
    label: '首页',
    children: null,
  },
  {
    key: '/state',
    label: 'Zustand 状态管理',
    children: null,
  },
  {
    key: '/tools',
    label: '工具箱',
    children: null,
  },
  {
    key: '/figure',
    label: '占位图在线生成',
    children: null,
  },
  {
    key: '/api/g/a/200',
    label: '自定义占位图',
    children: null,
  },
  {
    key: '/sse',
    label: 'SSE单向通信',
    children: null,
  },
]

export default function Header({ siteTitle }) {
  const store = useStore()
  const pathname = usePathname()
  const router = useRouter()
  const data = useReactive({
    activeKey: '',
  })

  const onChange = (key) => {
    data.activeKey = key
    router.push(key, { scroll: false })
  }

  useEffect(() => {
    data.activeKey = pathname
  }, [])

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="w-450px mx-auto mt-10px text-center">
        <p>博观而约取，厚积而薄发</p>
        <p className="text-#666 mt-10px">
          天问的个人网站(天问博客)，专注于Node.js、Vue.js、React、Vite、Npm、Nginx等大前端技术。不断学习新技术，记录日常开发问题，持续分享coding，极客开源，共同进步。生命不息，奋斗不止...
          [{' '}
          <a
            className="text-#66b1ff decoration-underline"
            href="https://tiven.cn"
          >
            hexo blog
          </a>{' '}
          ]
        </p>
        <p className="text-red">Count: {store.count}</p>
        <Tabs
          defaultActiveKey={data.activeKey}
          activeKey={data.activeKey}
          items={tabsData.map((item) => ({
            key: item.key,
            label: (
              <Link href={item.key} legacyBehavior>
                <a
                  className={item.key === data.activeKey ? 'text-#66b1ff' : ''}
                >
                  {item.label}
                </a>
              </Link>
            ),
            children: item.children,
          }))}
          onChange={onChange}
        />
      </section>
    </>
  )
}
