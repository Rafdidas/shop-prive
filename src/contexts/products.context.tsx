import React, { createContext, FC, useContext, useEffect, useState } from "react";


export interface Product {
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
};

export interface ProductResponse {
  products: Product[];
}

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  currentPage: number;
  hasMore: boolean;
  fetchProducts: (page?: number, category?: string) => void;
}

const defaultValue: ProductsContextType = {
  products: [],
  loading: false,
  currentPage: 1,
  hasMore: true,
  fetchProducts: () => {},
};

const ProductsContext = createContext<ProductsContextType>(defaultValue);

export const ProductsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = async (page: number = 1, category?: string) => {
        try {
            setLoading(true);
            let url: string;
            if (category) {
                // 카테고리 요청: 모든 상품을 가져옵니다.
                url = `https://fakestoreapi.in/api/products/category?type=${category}`;
            } else {
                // 페이지네이션 요청
                url = `https://fakestoreapi.in/api/products?page=${page}&limit=25`;
            }
            console.log("Fetching URL:", url);

            const response = await fetch(url);
            const data = await response.json();

            if (category && data.products) {
                setProducts(data.products);
                setHasMore(false);
            } else if (!category && data.products && data.products.length > 0) {
                setProducts((prev) => 
                    page === 1 ? data.products : [...prev, ...data.products]
                );
                setHasMore(data.products.length === 25);
            } else {
                setHasMore(false);
            }

            setCurrentPage(page);
        } catch (error) {
            console.log('상품 데이터를 가져오는 중 오류 발생:', error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    },[]);

    return (
        <ProductsContext.Provider value={{
            products,
            loading,
            currentPage,
            hasMore,
            fetchProducts
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('Error');
    }
    return context;
};

export default ProductsContext;

