import doctorRoute from "../services/endpoints/doctorRoutes";
import { axiosApi } from "../services/api";

export const docLogin =async(loginData)=>{
    try {
        const response =await axiosApi.post(doctorRoute.login,loginData)
        console.log('doc login res--',response);
        return response
    } catch (error) {
        console.log(error.message);
    }
}

export const docImage = async(image)=>{
    try {
        console.log('image ---',image);
        const res = await axiosApi.post(doctorRoute.image,image)
        console.log('object',res);
        return res
    } catch (error) {
        console.log(error.message);
    }
}

export const postDetails = async (formData)=>{
    try {
        const response = await axiosApi.post(doctorRoute.details,formData)
        return response
    } catch (error) {
        console.log(error.message)
    }
}