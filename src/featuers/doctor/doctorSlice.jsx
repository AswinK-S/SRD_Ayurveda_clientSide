import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:null
}

const doctorSlice = createSlice({
    name:'doctor',
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.user = action.payload
        },
        logout:(state)=>{
            state.user = null
        },
    },
})


export const {loginSuccess,logout} =doctorSlice.actions
export default doctorSlice.reducer