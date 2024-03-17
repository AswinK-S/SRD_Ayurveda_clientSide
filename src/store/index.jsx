import { configureStore } from "@reduxjs/toolkit";
import adminReducer from '../featuers/admin/adminSlice'
import userReducer from '../featuers/user/userSlice'
import doctorReducer from '../featuers/doctor/doctorSlice'

const store = configureStore({
    reducer:{
        admin:adminReducer,
        user:userReducer,
        doctor:doctorReducer,

    }
})

export default store