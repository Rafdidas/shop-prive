import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface CategoriesContextProps {
    categories: string[];
    loading: boolean;
    error: string | null;
}

const CategoriesContext = createContext<CategoriesContextProps>({
    categories: [],
    loading: false,
    error: null,
});

interface CategoriesProviderProps {
    children: ReactNode;
}

export const CategoriesProvider: FC<CategoriesProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://fakestoreapi.in/api/products/category');
                if (!response.ok) {
                    throw new Error("카테고리 데이터를 가져오는 데 실패했습니다.");
                }
                const data = await response.json();
                if (Array.isArray(data.categories)) {
                    setCategories(data.categories);
                    setError(null);
                }
            } catch (err: any) {
                setError(err.message || "Error");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories, loading, error }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("Error")
    }
    return context;
}
