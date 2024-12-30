import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/user.slice';
import categoriesReducer from './categories/categories.slice';
import productsReducer from './products/products.slice';
import cartReducer from './cart/cart.slice';
import detailSlice  from './detail/detail.slice';

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "cart"],
}

const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    detail: detailSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;