import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import authSlice from './auth/authSlice';
import userSlice from './user/userSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const commonConfig = {
    storage
}

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token', 'current'],
    key: 'social_media/user'
}

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
//     whitelist: ['user'],
// }

// const persistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: persistReducer(userConfig, userSlice)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)