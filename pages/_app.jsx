// _app.tsx
import '@unocss/reset/tailwind.css'
import 'uno.css'
import '@/assets/css/global.scss'
import '@/assets/css/md.scss'
import Layout, { siteTitle } from '@/components/layout'
import Header from '@/components/header'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
