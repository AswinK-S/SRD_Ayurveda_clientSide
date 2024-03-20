import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from '../featuers/admin/adminSlice'
import userReducer from '../featuers/user/userSlice'
import doctorReducer from '../featuers/doctor/doctorSlice'
import { persistReducer,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers( {
    admin: adminReducer,
    user: userReducer,
    doctor: doctorReducer,
})

const persistConfiq ={
    key:"root",
    version:1,
    storage,
};

const persistedReducer = persistReducer(persistConfiq,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
    
})



export const persistor = persistStore(store)