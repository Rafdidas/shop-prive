import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (__dirname, { rejectWithValue }) => {
        try {
            const response = await fetch('https://fakestoreapi.in/api/products/category');
            if (!response.ok) {
                throw new Error("카테고리 데이터를 가져오는 데 실패했습니다.");
            }
            const data = await response.json();
            return data.categories;
        } catch (error: any) {
            return rejectWithValue(error.messaga || "Error");
        }
    }
);