import Head from 'next/head'
import Link from 'next/link'
export default function Header({ siteTitle }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="w-450px mx-auto mt-10px text-center">
        <p>博观而约取，厚积而薄发</p>
        <p className="text-#666 mt-10px">
          Next.js
          为您提供生产环境所需的所有功能以及最佳的开发体验：包括静态及服务器端融合渲染、
          支持 TypeScript、智能化打包、 路由预取等功能 无需任何配置。 [{' '}
          <a
            className="text-#66b1ff decoration-underline"
            href="https://tiven.cn"
          >
            hexo blog
          </a>{' '}
          ]
        </p>
        <div className="flex justify-center items-center my-20px">
          <Link href="/" legacyBehavior>
            <a className="text-#66b1ff">首页</a>
          </Link>
          <div className="w-50px"></div>
          <Link href="/state" legacyBehavior>
            <a className="text-#66b1ff">Zustand 状态管理</a>
          </Link>
          <div className="w-50px"></div>
          <Link href="/api/g/a/200" legacyBehavior>
            <a className="text-#66b1ff">自定义占位图</a>
          </Link>
        </div>
      </section>
    </>
  )
}
