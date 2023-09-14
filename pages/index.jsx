import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '@/components/date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="w-300px mx-auto mt-10px">
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a
            className="text-#66b1ff decoration-underline"
            href="https://www.nextjs.cn/learn"
          >
            our Next.js tutorial
          </a>
          .)
        </p>
      </section>
      <section className="w-500px mx-auto shadow p-20px my-20px">
        <h2 className="font-600 mb-20px text-20px">Blog List</h2>
        <ul className="">
          {allPostsData.map(({ id, date, title }) => (
            <li className="b-b-1 mb-20px pb-10px" key={id}>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className="text-16px text-#66b1ff">{title}</a>
              </Link>
              <br />
              <small className="text-#666">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
