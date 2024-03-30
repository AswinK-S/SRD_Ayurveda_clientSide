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
        console.log('sltDta===',slotData);
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


