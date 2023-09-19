import { getSortedPostsData } from '@/lib/posts'
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
    <>
      <section>
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
    </>
  )
}
