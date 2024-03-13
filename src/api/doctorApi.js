import doctorRoute from "../services/endpoints/doctorRoutes";
import axiosApi from "../services/api";

export const docLogin =async(loginData)=>{
    try {
        const response =await axiosApi.post(doctorRoute.login,loginData)
        console.log('doc login res--',response);
        return response
    } catch (error) {
        console.log(error.message);
    }
}