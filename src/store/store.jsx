import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import modalReducer from "../features/modal/modalSlice"; // 경로 확인

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer, // modalReducer가 reducer로 추가되어야 함
  },
});
