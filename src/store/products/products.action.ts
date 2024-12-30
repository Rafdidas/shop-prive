import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsResponse } from "./products.slice";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page = 1, category }: { page?: number; category?: string }, { rejectWithValue }) => {
        try {
            let url: string;
            if (category) {
                url = `https://fakestoreapi.in/api/products/category?type=${category}`;
            } else {
                url = `https://fakestoreapi.in/api/products?page=${page}&limit=24`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('상품 데이터를 가져오는 데 실패했습니다.');
            }

            const data: ProductsResponse = await response.json();
            return { products: data.products, page, category };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error');
        }
    }
);