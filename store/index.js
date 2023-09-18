import { create } from 'zustand'

export const useStore = create((set) => ({
  // 定义你的状态
  count: 0,

  // 定义你的操作
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
