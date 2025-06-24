import { configureStore } from '@reduxjs/toolkit'
import saveReducer from './redux/saveSlice.js'

export const store = configureStore({
  reducer: {
    save: saveReducer
  },
})