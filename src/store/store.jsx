import { create } from 'zustand';
import cartItems from '../constants/cartItems'; // constants에서 cartItems 가져오기

const useStore = create((set) => ({
  cartItems: cartItems, // constants의 cartItems로 초기화
  amount: 0,
  total: 0,
  isOpen: false,

  // 액션들
  increase: (id) => set((state) => {
    const updatedItems = state.cartItems.map(item => 
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    return { cartItems: updatedItems };
  }),

  decrease: (id) => set((state) => {
    const updatedItems = state.cartItems.map(item => 
      item.id === id ? { ...item, amount: item.amount - 1 } : item
    );
    return { cartItems: updatedItems };
  }),

  removeItem: (id) => set((state) => {
    const updatedItems = state.cartItems.filter(item => item.id !== id);
    return { cartItems: updatedItems };
  }),

  clearCart: () => set({ cartItems: [], amount: 0, total: 0 }),

  openModal: () => set({ isOpen: true }),

  closeModal: () => set({ isOpen: false }),

  // 총합 계산 함수
  calculateTotals: () => set((state) => {
    const updatedAmount = state.cartItems.reduce((acc, item) => acc + item.amount, 0);
    const updatedTotal = state.cartItems.reduce((acc, item) => acc + item.amount * item.price, 0);
    return { amount: updatedAmount, total: updatedTotal };
  }),
}));

export default useStore;
