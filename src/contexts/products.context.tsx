import React, { createContext, FC, useCallback, useContext, useEffect, useState } from "react";


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
            // 기본 URL 설정
            let url = `https://fakestoreapi.in/api/products?page=${page}&limit=15`;

            // 카테고리 필터링이 있으면 다른 URL 사용
            if (category) {
                url = `https://fakestoreapi.in/api/products/category?type=${category}&page=${page}&limit=15`;
            }
            const response = await fetch(url);
            const data: ProductResponse = await response.json();

            if (data.products && data.products.length > 0) {
                setProducts((prev) => (page === 1 ? data.products : [...prev, ...data.products])); // 중복 추가 방지
                setCurrentPage(page); // 현재 페이지 업데이트
                setHasMore(data.products.length === 15); // 데이터가 15개 미만이면 더 없음
            } else {
                setHasMore(false);
            }
            console.log("Fetching page:", page, "Category:", category);
            console.log("URL:", url);
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

