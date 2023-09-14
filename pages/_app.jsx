// _app.tsx
import '@unocss/reset/tailwind.css'
import 'uno.css';
import '@/assets/css/md.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp