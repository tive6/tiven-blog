import { useEffect } from 'react'
import { useStore } from '@/store'

const MyPage = () => {
  const store = useStore()

  useEffect(() => {
    // 在组件加载时更新状态
    console.log(12)
    // store.increment()
  }, [])

  return (
    <div className="flex flex-col text-center p-20px">
      <h1>About Page</h1>
      <h2 className="text-20px my-20px">Next.js + Zustand SSR 状态管理</h2>
      <p className="text-red">Count: {store.count}</p>
      <br />
      <button className="btn" onClick={() => store.increment()}>
        Increment ++
      </button>
      <br />
      <button className="btn" onClick={() => store.decrement()}>
        Decrement --
      </button>
    </div>
  )
}

export default MyPage
