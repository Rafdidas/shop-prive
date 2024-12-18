import React, { createContext, FC, useContext, useState } from "react";

interface ProductDetail {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    image: string;
    category: string;
}

interface DetailContextType {
    productDetail: ProductDetail | null;
    loading: boolean;
    fetchProductDetail: (productId: string) => void;
}

const DetailContext = createContext<DetailContextType | undefined>(undefined);

export const DetailProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProductDetail = async (productId: string) => {
        setLoading(true);
        try {
            const reponse = await fetch(`https://fakestoreapi.in/api/products/${productId}`);
            const data = await reponse.json();
            if (data && data.product) {
                setProductDetail(data.product);
            } else {
                console.error("Invalid product data:", data);
            }
        } catch (error) {
            console.error("상품 상세 정보를 가져오는 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DetailContext.Provider value={{ productDetail, loading, fetchProductDetail }}>
            {children}
        </DetailContext.Provider>
    );
};

export const useDetail = () => {
    const context = useContext(DetailContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
}
