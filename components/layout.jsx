import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const name = 'Tiven'
export const siteTitle = '天问博客'

export const picSrc = 'https://placekitten.com/g/350/350'

export default function Layout({ children, home }) {
  return (
    <div className="w-680px mx-auto py-3">
      <Head>
        <link rel="icon" href="/web/favicon.ico" />
        <meta
          name="description"
          content="天問的个人网站(天问博客)，专注于Node.js、Vue、React、Svelte、Electron、Tauri、Vite、Nginx等大前端技术。不断学习新技术，记录日常开发问题，持续分享coding，极客开源，共同进步。生命不息，奋斗不止..."
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex items-center justify-center flex-col">
        {home ? (
          <>
            <Image
              src={picSrc}
              className="block w-100px rounded-full"
              width={100}
              height={100}
              alt={name}
            />
            <h1 className="text-center">{name}</h1>
          </>
        ) : (
          <>
            <Link href="/" legacyBehavior>
              <a>
                <Image
                  src={picSrc}
                  className="block w-100px rounded-full"
                  width={100}
                  height={100}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className="text-center">
              <Link href="/" legacyBehavior>
                <a className="">{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-20px text-#66b1ff">
          <Link href="/" legacyBehavior>
            <a>← 返回首页</a>
          </Link>
        </div>
      )}
    </div>
  )
}
