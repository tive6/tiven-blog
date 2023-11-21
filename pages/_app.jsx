// _app.tsx
import '@unocss/reset/tailwind-compat.css'
// import '@unocss/reset/tailwind.css'
// import '@unocss/reset/normalize.css'
import 'uno.css'
import '@/assets/css/global.scss'
import '@/assets/css/md.scss'

import Layout from '@/components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
