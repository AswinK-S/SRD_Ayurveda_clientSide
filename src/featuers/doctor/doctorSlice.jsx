// doctorSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctor: JSON.parse(localStorage.getItem('doctor')) || null,
    doctorFile:JSON.parse(localStorage.getItem('doctor_data'))||null,
    docImgFile:JSON.parse(localStorage.getItem('docImg'))||null
}

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        docloginSuccess: (state, action) => {
            state.doctor = action.payload;
            localStorage.setItem('doctor', JSON.stringify(action.payload)); // Save to localStorage
        },
        uploadFileSuccess: (state, action) => {
            state.doctorFile = action.payload;
            localStorage.setItem('doctor_data', JSON.stringify(action.payload))
        },
        uploadProfileImage:(state,action) =>{
            state.docImgFile = action.payload
            localStorage.setItem('docImg',JSON.stringify(action.payload)) 
        },
        logout: (state) => {
            state.doctor = null;
            localStorage.removeItem('doctor'); // Remove from localStorage
        },
    },
});

export const { docloginSuccess, uploadFileSuccess , logout ,uploadProfileImage } = doctorSlice.actions;
export default doctorSlice.reducer;
        






