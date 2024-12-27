import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductDetail } from "./detail.slice";

export const fetchProductDetail = createAsyncThunk(
    "detail/fetchProductDetail",
    async (productId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://fakestoreapi.in/api/products/${productId}`);
            const data = await response.json();
            
            if (!data || !data.product) {
                throw new Error("상품 데이터를 찾을 수 없습니다.");
            }

            return data.product as ProductDetail;
        } catch (error: any) {
            return rejectWithValue(error.message || "Error fetching product detail");
        }
    }
);