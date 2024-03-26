import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    admin:JSON.parse(localStorage.getItem("admin")) ||null,
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.admin = action.payload
            localStorage.setItem("admin",JSON.stringify(action.payload))
        },
        logout:(state)=>{
            state.admin=null
            localStorage.removeItem("admin")
        }
    }
})

export const {loginSuccess,logout} = adminSlice.actions

export default adminSlice.reducer