import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    doctor:null
}

const doctorSlice = createSlice({
    name:'doctor',
    initialState,
    reducers:{
        docloginSuccess:(state,action)=>{
            state.doctor = action.payload
        },
        logout:(state)=>{
            state.doctor = null
        },
    },
})


export const {docloginSuccess,logout} =doctorSlice.actions
export default doctorSlice.reducer