import {
  configureStore,
  combineReducers,
  type ThunkAction,
  type Action
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook
} from 'react-redux';

import settingsSlice from './slices/settings.slice';
import authSlice from './slices/auth.slice';

import authService from './services/auth.service';
import productService from './services/product.service';
import companyService from './services/company.service';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'user']
};

const persistSettingsConfig = {
  key: 'settings',
  storage,
  whitelist: ['themeMode']
};

const rootReducer = combineReducers({
  settings: persistReducer(persistSettingsConfig, settingsSlice),
  auth: persistReducer(persistAuthConfig, authSlice),
  [authService.reducerPath]: authService.reducer,
  [productService.reducerPath]: productService.reducer,
  [companyService.reducerPath]: companyService.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
      .concat(authService.middleware)
      .concat(productService.middleware)
      .concat(companyService.middleware)
});

// types
type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<unknown>
>;
export const useCustomDispatch: () => Dispatch = useDispatch;
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

export default store;
