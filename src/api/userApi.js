import userRoutes from "../services/endpoints/userRoutes";
import { axiosApi } from "../services/api";

//login route
export const login = async (loginData)=>{
    try{
        console.log('login data :',loginData);
        console.log('------------');
        const response = await axiosApi.post(userRoutes.login,loginData)
        console.log('------',response);
        console.log('response :',response);
        return response
    }catch(error){
        console.error("axios error :",error.response.data.message);
        
        return error.response.data.message
    }
}

export const treatments = async ()=>{
    try {
        let res = await axiosApi.get(userRoutes.treatments)
        return res
    } catch (error) {
        console.log(error.message);
    }
}

//otp submition route
export const registerUser = async (otp)=>{
    console.log('otp data :',otp);
    let response = await axiosApi.post(userRoutes.registerUser,{otp:otp})
    console.log('otp submit response :', response);
    return response
}

//signup route
export const signup = async (resgisterData)=>{
    try{
        console.log('register details :',resgisterData);
        let response = await axiosApi.post(userRoutes.signup,resgisterData)
        console.log('signup response',response);
        return response
    }catch(error){
        console.log('register err  :',error.message);   
        return error.message

    }
}