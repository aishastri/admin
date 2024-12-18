import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './service/apiSlice'

import togglerReducer from './features/header/toggler'
import authSlice from './features/auth/authSlice'

const store = configureStore({
  reducer: {
    header: togglerReducer,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

setupListeners(store.dispatch)

export default store
