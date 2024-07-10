import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : [],
    cartItems: []
}

const categorySlice = createSlice({
name : 'category',
initialState,
reducers:{
    addCategory:(state,action)=>{
        console.log('add category');
         console.log('state',state);
         console.log('action',action.payload);
        //  console.log(state.value);
         state.value.push(action.payload)
    },
    removeCategory:(state,action)=>{
        console.log('remove category');
    },
    deleteCategory:(state,action)=>{
        console.log('delete category');
        // console.log(state);
        console.log('action payload',action.payload);
        // action.payload.remove();
        const cartID = action.payload;
        console.log(cartID);
         
        //  state.cartItems = state.cartItems.filter((item)=> item.id != cartID )
         state.cartItems = state.cartItems.filter((item)=> console.log(item) )
        //  console.log('item', item.id, 'cartid', cartID)
        console.log('------>',state.cartItems);
    },

}
})

export const {addCategory,removeCategory,deleteCategory} = categorySlice.actions

export default categorySlice.reducer