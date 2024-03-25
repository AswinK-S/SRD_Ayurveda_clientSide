// doctorSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctor: JSON.parse(localStorage.getItem('doctor')) || null
}

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        docloginSuccess: (state, action) => {
            state.doctor = action.payload;
            localStorage.setItem('doctor', JSON.stringify(action.payload)); // Save to localStorage
        },
        logout: (state) => {
            state.doctor = null;
            localStorage.removeItem('doctor'); // Remove from localStorage
        },
    },
});

export const { docloginSuccess, logout } = doctorSlice.actions;
export default doctorSlice.reducer;







// import { createSlice } from "@reduxjs/toolkit";

// const initialState ={
//     doctor:null
// }

// const doctorSlice = createSlice({
//     name:'doctor',
//     initialState,
//     reducers:{
//         docloginSuccess:(state,action)=>{
//             state.doctor = action.payload
//         },
//         logout:(state)=>{
//             state.doctor = null
//         },
//     },
// })


// export const {docloginSuccess,logout} =doctorSlice.actions
// export default doctorSlice.reducer