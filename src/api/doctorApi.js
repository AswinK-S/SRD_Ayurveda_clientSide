import doctorRoute from "../services/endpoints/doctorRoutes";
import { axiosApi } from "../services/api";

export const docLogin =async(loginData)=>{
    try {
        const response =await axiosApi.post(doctorRoute.login,loginData)
        console.log('doc login res--',response);
        return response
        
    } catch (error) {

        console.log('doc log err',error.message);
        if(error?.response){
            console.log('err response--->',error?.response?.data?.message);
            return error?.response?.data?.message
        }
    }
}

export const getdoctor = async(id)=>{
    try {
        console.log('id------get doc',id);
        const result = await axiosApi.get(`${doctorRoute.getDoctorDetails}/${id}`)
        return result
    } catch (error) {
        console.log('api err',error.message);
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

export const uploadDocument = async(document)=>{
    try {
        const res = await axiosApi.post(doctorRoute.document, document)
        return res
    } catch (error) {
        console.log(error.message);
    }
}

export const postDetails = async (formData,id)=>{
    try {
        const response = await axiosApi.post(doctorRoute.details,{...formData,id})
        return response
    } catch (error) {
        console.log(error.message)
    }   
}

export const createSlot =async (slotData)=>{
    try{
        console.log('slotData===',slotData);
        const result = await axiosApi.post(doctorRoute.slotCreation,slotData)
        console.log('result--',result);
        return result
    }catch(error){
        console.log(error.message);
    }
} 


export const getSlots = async(id)=>{
    try {
        const result = await axiosApi.get(`${doctorRoute.getSlots}/${id}`,)
        return result
    } catch (error) {
        console.log(error.message);
    }
}


export const changePsswrdOtp = async(email,name)=>{
    try {
        console.log('email--',email);
        const result = await axiosApi.post(doctorRoute.changePassword,{email,name})
        console.log('rslt----',result);
        return result?.data?.message

    } catch (error) {
       console.log(error.message); 
    }
}

export const verifyOtp = async(otp,email)=>{
    try{
        console.log('sndin dta------');
        const result = await axiosApi.post(doctorRoute.verifyOtp,{otp,email})
        return result.data
    }catch(error){
        console.log(error.message);
    }
}

export const updatePassword = async(password,id)=>{
    try {
        const result = await axiosApi.patch(doctorRoute.updatePassword,{password,id})
        console.log('resul---',result);
        return result.data

    } catch (error) {
        console.log(error.message);
    }
}


export const getPatients = async(docId,page,limit)=>{
    try {
        console.log('doc Id sending',docId);
        const result = await axiosApi.get(`${doctorRoute.getPatients}?docId=${docId}&limit=${limit}&page=${page}`)
        // console.log('patients--',result);
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}