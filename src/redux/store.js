import { configureStore } from "@reduxjs/toolkit"
 
import categorySlice from "./reducers/categorySlice"
import productSlice from "./reducers/productSlice"

 
const appStore = configureStore({
    reducer:{
        products:productSlice,
        category: categorySlice
    }
})

export default appStore