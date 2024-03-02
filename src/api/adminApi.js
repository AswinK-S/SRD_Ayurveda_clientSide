import adminRoutes from "../services/endpoints/adminRoutes";
import axiosApi from "../services/api";

//login
export const login = async (loginData)=>{
    try{
        console.log('admin login data :',loginData);
        let res = await axiosApi.post(adminRoutes.login,loginData)
        console.log('ad lgn res :',res);
        return res
    }catch(err){
        console.log('admin login error :',err.message);
    }
}