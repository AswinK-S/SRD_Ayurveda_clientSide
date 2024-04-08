import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from '../featuers/admin/adminSlice'
import userReducer from '../featuers/user/userSlice'
import doctorReducer from '../featuers/doctor/doctorSlice'
import bookingReducer from '../featuers/booking/booking'

const rootReducer = combineReducers( {
    admin: adminReducer,
    user: userReducer,
    doctor: doctorReducer,
    booking:bookingReducer
})

export const store = configureStore({
   reducer:rootReducer
    
})



