// _app.tsx
import '@unocss/reset/tailwind-compat.css'
// import '@unocss/reset/tailwind.css'
// import '@unocss/reset/normalize.css'
import 'uno.css'
import '@/assets/css/global.scss'
import '@/assets/css/md.scss'
import 'dayjs/locale/zh-cn'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import Layout from '@/components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  )
}

export default MyApp
