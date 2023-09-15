import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="w-100vw h-100vh flex flex-col justify-center items-center">
      <Image
        className="block max-w-1000px w-100%"
        src="https://tiven.cn/static/img/img-404-LAqCDl4CN5dUY4t2CpXhP.jpg"
        width={800}
        height={450}
        alt="404"
      />
      <Link href="/" legacyBehavior>
        <a className="text-#66b1ff text-20px mt-20px">← 返回首页</a>
      </Link>
    </div>
  )
}
