import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../products/products.slice";

export interface CartItem extends Products {
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice ({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.productId);
            if (existingItem) {
                existingItem.quantity = action.payload.quantity
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;