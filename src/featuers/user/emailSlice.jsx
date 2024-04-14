import { createSlice } from "@reduxjs/toolkit";

const initialState={
    email:localStorage.getItem('email')||null
}

const emailSlice = createSlice({
    name:'email',
    initialState,
    reducers:{
        emailToChngePsswrd:(state,action)=>{
            state.email = action.payload
            localStorage.setItem("email",JSON.stringify(action.payload))
        },
        
        removeEmail:(state)=>{
            state.email = null
            localStorage.removeItem('email')
        }

    }
})

export const {emailToChngePsswrd,removeEmail} = emailSlice.actions

export default emailSlice.reducer