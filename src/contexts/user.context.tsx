import React, { createContext, useContext, useState, useEffect, FC } from "react";


import { User, onAuthStateChanged } from "firebase/auth";
import { auth, signOutUser, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

interface UserContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user: User | null) => {
                if (user) {
                    // Firebase 인증 유저 정보를 Firestore에 저장
                    createUserDocumentFromAuth(user);
                }
                setCurrentUser(user);
            },
            (error: Error) => {
                console.error("Error detecting auth state change:", error);
            }
        );

        // 컴포넌트가 언마운트될 때 구독 해제
        return unsubscribe;
    }, []);

    const signOut = async () => {
        try {
            await signOutUser();
            setCurrentUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, signOut }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};