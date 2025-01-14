import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  createAuthUserWithEmailAndPassword, 
  signInAuthUserWithEmailAndPassword, 
  signOutUser, 
  getCurrentUser,
  createUserDocumentFromAuth,
  UserData,
} from '../../utils/firebase/firebase.utils';

interface UserState {
  currentUser: UserData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  status: 'idle',
  error: null,
};

// 비동기 액션: 사용자 로그인
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInAuthUserWithEmailAndPassword(email, password);
      if (userCredential && userCredential.user) {
        const userSnapshot = await createUserDocumentFromAuth(userCredential.user);
        return userSnapshot?.data() as UserData;
      }
      throw new Error('User not found');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 비동기 액션: 사용자 로그아웃
export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await signOutUser();
    return null;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// 비동기 액션: 현재 사용자 가져오기
export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const userAuth = await getCurrentUser();
    if (userAuth) {
      const userSnapshot = await createUserDocumentFromAuth(userAuth);
      return userSnapshot?.data() as UserData;
    }
    return null;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 로그인
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // 로그아웃
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.status = 'succeeded';
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // 현재 사용자
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<UserData | null>) => {
        state.currentUser = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCurrentUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetError } = userSlice.actions;

export default userSlice.reducer;