import React, { createContext, FC, useContext, useState } from "react";
import { Product } from "./products.context";

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    totalItems: number; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const totalItems = cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0
    );

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) => 
                    item.id === product.id 
                        ? {...item, quantity: item.quantity + 1} 
                        : item
                );
            } else {
                return [...prev, {...product, quantity: 1}];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prev) => prev.filter((item) =>  item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}>
            {children}
        </CartContext.Provider>
    )

};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart error");
    }

    return context;
}