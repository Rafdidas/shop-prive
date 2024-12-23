import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { setCurrentUser, clearCurrentUser } from "./user.slice";

export const AuthChanges = createAsyncThunk(
    'user/AuthChanges',
    async (_, { dispatch }) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userSnapshot = await createUserDocumentFromAuth(user);
                const userData = userSnapshot?.data();
                dispatch(setCurrentUser({
                    ...user, 
                    displayName: userData?.displayName ?? null, 
                }));
            } else {
                dispatch(clearCurrentUser());
            }
        })
    }
)