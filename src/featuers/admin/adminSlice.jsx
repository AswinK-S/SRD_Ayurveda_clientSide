import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:null,
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.user = action.payload
        },
        logout:(state)=>{
            state.user=null
        }
    }
})

export const {loginSuccess,logout} = adminSlice.actions

export default adminSlice.reducer