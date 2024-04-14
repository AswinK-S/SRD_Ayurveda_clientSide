import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from '../featuers/admin/adminSlice'
import userReducer from '../featuers/user/userSlice'
import doctorReducer from '../featuers/doctor/doctorSlice'
import bookingReducer from '../featuers/booking/booking'
import emailReducer from '../featuers/user/emailSlice'

const rootReducer = combineReducers( {
    admin: adminReducer,
    user: userReducer,
    doctor: doctorReducer,
    booking:bookingReducer,
    email:emailReducer
})

export const store = configureStore({
   reducer:rootReducer
    
})



