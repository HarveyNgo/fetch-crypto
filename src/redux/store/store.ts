import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import marketsReducer from '../slices/marketsSlice';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

// Combine Reducers
const rootReducer = combineReducers({
  auth: authReducer,
  markets: marketsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});
// Persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
