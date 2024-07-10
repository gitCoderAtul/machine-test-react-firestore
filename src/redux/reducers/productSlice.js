import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : []
}

const productSlice = createSlice({
name : 'products',
initialState,
reducers:{
    addProduct:(state,action)=>{ 
        console.log('state',state);
        console.log('action',action.payload);
       //  console.log(state.value);
        state.value.push(action.payload)
        console.log('add product');
    },
    removeProduct:()=>{
        console.log('remove product');
    },
    deleteProduct:()=>{
        console.log('delete product');
    },

}
})

export const {addProduct,removeProduct,deleteProduct} = productSlice.actions

export default productSlice.reducer