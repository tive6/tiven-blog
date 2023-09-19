import { useEffect } from 'react'
import { useStore } from '@/store'

const MyPage = () => {
  const store = useStore()

  useEffect(() => {
    // 在组件加载时更新状态
    // store.increment()
  }, [])

  return (
    <div className="flex flex-col text-center p-20px">
      <h1 className="text-20px my-20px">Next.js + Zustand SSR 状态管理</h1>
      <p className="text-red">Count: {store.count}</p>
      <br />
      <button
        className="py-5px b-1 b-blue-300 bg-blue-300 text-white rounded-3px"
        onClick={() => store.increment()}
      >
        Increment ++
      </button>
      <br />
      <button
        className="py-5px b-1 b-pink-300 bg-pink-300 text-white rounded-3px"
        onClick={() => store.decrement()}
      >
        Decrement --
      </button>
    </div>
  )
}

export default MyPage
