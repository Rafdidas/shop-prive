import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './root-reducer';// Root Reducer는 각 slice를 조합한 것

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Store의 타입 추론
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;