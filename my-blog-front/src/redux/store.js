import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import basePageSlice from './basePageSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, basePageSlice);


const store = configureStore({
  reducer: {
    blog: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;