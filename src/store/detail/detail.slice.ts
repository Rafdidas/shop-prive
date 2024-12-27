import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductDetail } from "./detail.action";

export interface ProductDetail {
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

interface DetailState {
    productDetail: ProductDetail | null;
    loading: boolean;
    error: string | null;
}

const initialState: DetailState = {
    productDetail: null,
    loading: false,
    error: null,
}

const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        clearProductDetail: (state) => {
            state.productDetail = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action: PayloadAction<ProductDetail>) => {
                state.productDetail = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductDetail.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { clearProductDetail } = detailSlice.actions;
export default detailSlice.reducer;