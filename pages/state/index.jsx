import MyPage from '@/components/myPage'
import { useStore } from '@/store'

export async function getServerSideProps() {
  const { count } = useStore.getState() // 获取当前状态的值
  console.log({ count })
  // 将状态传递给服务器端渲染的组件
  return { props: { initialState: { count } } }
}

export default function Page({ initialState }) {
  return <MyPage initialState={initialState} />
}
