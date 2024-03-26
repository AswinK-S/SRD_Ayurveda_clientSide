import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from '../featuers/admin/adminSlice'
import userReducer from '../featuers/user/userSlice'
import doctorReducer from '../featuers/doctor/doctorSlice'


const rootReducer = combineReducers( {
    admin: adminReducer,
    user: userReducer,
    doctor: doctorReducer,
})

export const store = configureStore({
   reducer:rootReducer
    
})



