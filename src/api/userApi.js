import userRoutes from "../services/endpoints/userRoutes";
import axiosApi from "../services/api";


export const login = async (loginData)=>{
    try{
        console.log('login data :',loginData);
        let response = await axiosApi.post(userRoutes.login,loginData)
        console.log('response :',response);
        return response
    }catch(error){
        console.log("axios error :",error.message);
    }
}


export const signup = async (resgisterData)=>{
    try{
        console.log('register details :',resgisterData);
        let response = await axiosApi.post(userRoutes.signup,resgisterData)
        return response
    }catch(error){
        console.log('register err :',error.message);
    }
}