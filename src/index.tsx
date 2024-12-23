import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CategoriesProvider } from './contexts/categories.context';
import { ProductsProvider } from './contexts/products.context';
import { DetailProvider } from './contexts/detail.context';
import { CartProvider } from './contexts/cart.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CategoriesProvider>
      <ProductsProvider>
        <DetailProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </DetailProvider>
      </ProductsProvider>
    </CategoriesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
