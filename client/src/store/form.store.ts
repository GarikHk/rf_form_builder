import { configureStore } from '@reduxjs/toolkit'
import { formSlice } from './form.slice'

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  }
})