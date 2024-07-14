import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./CreateSlice"

export const store = configureStore({
    reducer:{
        cart: cartSlice
    }
})