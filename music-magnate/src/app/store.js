import { configureStore } from '@reduxjs/toolkit';
import clickerReducer from '../features/clicker/clickerSlice';
import settingsReducer from '../features/settings/settingsSlice';

export const store = configureStore({
    reducer: {
        clicker: clickerReducer,
        settings: settingsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
}); 