import i18nReducer from "./reducer/i18nSlice";
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'
import loginSlice from "./reducer/loginSlice";
import contentLoadSlice from './reducer/contentLoadSlice';
import routesSlice from './reducer/routesSlice';
import crudSlice from './reducer/crudSlice';
import toastSlice from './reducer/toastSlice';

const persistConfig = {
  key: 'stain-app',
  storage,
  stateReconciler: autoMergeLevel2,
  // whitelist: ['AppReducer',],
  blacklist: ['contentReducer', 'crudReducer', 'toastReducer'],
};

export const combinedReducer = combineReducers({
  i18n: i18nReducer,
  loginReducer: loginSlice,
  routesReducer: routesSlice,
  contentReducer: contentLoadSlice,
  crudReducer: crudSlice,
  toastReducer: toastSlice,
 })

// const preloadedState = {
//   app: initialState
// }

const persistedReducer = persistReducer(persistConfig, combinedReducer);


const store = configureStore({
  reducer: persistedReducer,
  // preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
  // devTools: process.env.NODE_ENV !== 'production',
})

const persistor = persistStore(store);

export { store, persistor };

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batched subscribe, and devtools enhancers were composed together

export default function AppWrapper({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}