import Layout from '@/components/layout'
import {getAllPostIds, getPostData} from "@/lib/posts";
import Head from "next/head";
import Date from "@/components/date";
// import 'highlight.js/lib/common';
// import 'highlight.js/styles/monokai-sublime.css';
// import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
// import 'highlight.js/styles/tomorrow-night-bright.css';
// import '@/assets/css/md.scss'

export default function Post({ postData }) {
  return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        {/*<style jsx global>*/}
        {/*  {`*/}
        {/*    pre {*/}
        {/*      background-color: #282c34 !important;*/}
        {/*    }*/}
        {/*    pre code {*/}
        {/*      color: #abb2bf !important;*/}
        {/*    }*/}
        {/*    article.prose p code {*/}
        {/*      color: #c7254e;*/}
        {/*      background-color: #f9f2f4;*/}
        {/*      border-radius: 2px;*/}
        {/*      padding: 2px 4px;*/}
        {/*    }*/}
        {/*    article.prose p code:before,*/}
        {/*    article.prose p code:after {*/}
        {/*      display: none;*/}
        {/*    }*/}
        {/*  `}*/}
        {/*</style>*/}
        <div data-id={postData.id} className="shadow p-20px mt-20px">
          <h1 className="font-bold text-24px">
            {postData.title}
          </h1>
          <div className="text-#666">
            <Date dateString={postData.date} />
          </div>
          <br />
          <article className="mt-20px text-base prose prose-truegray xl:text-xl"
               dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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