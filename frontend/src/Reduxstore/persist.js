import {persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore,createSlice } from '@reduxjs/toolkit';
import {chatReducer} from './Store'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['chat'],
    blocklist: ['flow']
  }

  const persistedReducer = persistReducer(persistConfig, chatReducer);
  const store = configureStore(persistedReducer)
  
  export const persistedStore = persistStore(store)
