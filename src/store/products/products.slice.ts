import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./products.action";

export interface Products {
    id: number;
    brand: string;
    category: string;
    color: string;
    description: string;
    discount: number;
    image: string;
    model: string;
    popular: boolean;
    price: number;
    title: string;
}

export interface ProductsResponse {
    products: Products[];
}

interface ProductsState {
    products: Products[];
    loading: boolean;
    currentPage :number;
    hasMore: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    currentPage: 1,
    hasMore: true,
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.products = [];
            state.currentPage = 1;
            state.hasMore = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ products: Products[]; page: number; category?: string }>) => {
                const { products, page, category } = action.payload;

                if (category) {
                    state.products = products;
                    state.hasMore = false;
                } else {
                    state.products = page === 1 ? products : [...state.products, ...products];
                    state.hasMore = products.length === 24;
                }

                state.currentPage = page;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer;