import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    admin:null,
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.admin = action.payload
        },
        logout:(state)=>{
            state.admin=null
        }
    }
})

export const {loginSuccess,logout} = adminSlice.actions

export default adminSlice.reducer