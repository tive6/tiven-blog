import { Image } from 'antd'
const defaultPath = '/api/g/400/200'
const imgSrc = '/img.svg'
export default function Page() {
  return (
    <div
      className="max-w-100% mx-auto flex justify-center"
      style={{ paddingBottom: '20px', minHeight: '200px' }}
    >
      <Image
        style={{ margin: '0 auto', display: 'block', maxWidth: '100%' }}
        src={imgSrc}
        fallback={`${defaultPath}?text=Error&color=red`}
      />
    </div>
  )
}
