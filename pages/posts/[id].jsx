import Layout from '@/components/layout'
import {getAllPostIds, getPostData} from "@/lib/posts";
import Head from "next/head";
import Date from "@/components/date";

export default function Post({ postData }) {
  return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <div data-id={postData.id} className="shadow p-20px mt-20px">
          <h1 className="font-bold text-24px">
            {postData.title}
          </h1>
          <div className="text-#666">
            <Date dateString={postData.date} />
          </div>
          {/*{postData.date}*/}
          <br />
          <div className="mt-20px" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}