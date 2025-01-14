import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../products/products.slice";

export interface CartItem extends Products {
    quantity: number;
    checked: boolean;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(), // 초기 상태를 LocalStorage에서 불러옴
  } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push({ ...action.payload, checked: true });
      }
      saveCartToLocalStorage(state.cartItems); // LocalStorage에 저장
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.cartItems); // LocalStorage에 저장
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToLocalStorage(state.cartItems); // LocalStorage에 저장
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.productId);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state.cartItems); // LocalStorage에 저장
    },
    toggleItemCheck: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.checked = !item.checked;
      }
      saveCartToLocalStorage(state.cartItems); // LocalStorage에 저장
    },
    toggleAllCheck: (state, action: PayloadAction<boolean>) => {
      state.cartItems.forEach(item => {
        item.checked = action.payload;
      });
      saveCartToLocalStorage(state.cartItems); // LocalStorage에 저장
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, toggleAllCheck, toggleItemCheck } = cartSlice.actions;
export default cartSlice.reducer;