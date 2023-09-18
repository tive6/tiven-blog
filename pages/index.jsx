import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '@/components/date'
import Image from 'next/image'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  // console.log('allPostsData', allPostsData)
  return {
    props: {
      allPostsData: allPostsData.map((item) => ({
        ...item,
        date: item.date + '',
      })),
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="w-450px mx-auto mt-10px">
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
      </section>
      <section className="mt-20px">
        <Image
          src="https://tiven.cn/static/img/cycling-01-lZ6jqdHF.jpg"
          className="block w-100% rounded-6px"
          width={2000}
          height={2000}
          alt="tiven"
        />
      </section>
      <section className="w-500px mx-auto shadow p-20px my-20px">
        <h2 className="font-600 mb-20px text-20px">博客列表</h2>
        <ul className="">
          {allPostsData.map(({ id, date, title }) => (
            <li className="b-b-1 mb-20px pb-10px" key={id}>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className="text-16px text-#66b1ff">{title}</a>
              </Link>
              <br />
              <small className="text-#666">
                <Date dateString={date + ''} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
