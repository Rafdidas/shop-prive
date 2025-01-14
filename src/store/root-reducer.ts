import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user/user.slice';
import categoriesReducer from './categories/categories.slice';
import productsReducer from './products/products.slice';
import cartReducer from './cart/cart.slice';
import detailSlice  from './detail/detail.slice'

const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    detail: detailSlice,
});

export default rootReducer;