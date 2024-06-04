import doctorRoute from "../services/endpoints/doctorRoutes";
import { axiosApi } from "../services/api";

export const docLogin =async(loginData)=>{
    try {
        const response =await axiosApi.post(doctorRoute.login,loginData)
        return response
        
    } catch (error) {

        if(error?.response){
            return error?.response?.data?.message
        }
    }
}

export const getdoctor = async(id)=>{
    try {
        const result = await axiosApi.get(`${doctorRoute.getDoctorDetails}/${id}`)
        return result
    } catch (error) {
        console.log('api err',error.message);
    }
}

export const docImage = async(image)=>{
    try {
        const res = await axiosApi.post(doctorRoute.image,image)
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
        const result = await axiosApi.post(doctorRoute.slotCreation,slotData)
        return result
    }catch(error){
        console.log(error.message);
    }
} 


export const getSlots = async(id,pageNumber,pageSize)=>{
    try {
        const result = await axiosApi.get(`${doctorRoute.getSlots}/${id}/${pageNumber}/${pageSize}`,)
        return result
    } catch (error) {
        console.log(error.message);
    }
}


export const changePsswrdOtp = async(email,name)=>{
    try {
        const result = await axiosApi.post(doctorRoute.changePassword,{email,name})
        return result?.data?.message

    } catch (error) {
       console.log(error.message); 
    }
}

export const verifyOtp = async(otp,email)=>{
    try{
        const result = await axiosApi.post(doctorRoute.verifyOtp,{otp,email})
        return result.data
    }catch(error){
        console.log(error.message);
    }
}

export const updatePassword = async(password,id)=>{
    try {
        const result = await axiosApi.patch(doctorRoute.updatePassword,{password,id})
        return result.data

    } catch (error) {
        console.log(error.message);
    }
}


export const getPatients = async(docId,page,limit)=>{
    try {
        const result = await axiosApi.get(`${doctorRoute.getPatients}?docId=${docId}&limit=${limit}&page=${page}`)
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}

//add prescription
export const addPrescription =async(prescription,docId,userEmail)=>{
    try {
        const result = await axiosApi.post(doctorRoute.addPrescription,{prescription,docId,userEmail})
        return result
    } catch (error) {
        console.log(error.message)
    }
}

//get data for overview
export const getDataForOverview = async(id)=>{
    try {
        const result = await axiosApi.get(`${doctorRoute.getDateForOverview}?id=${id}`)
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}


//confirm patient confirmation
export const confirmConsultation = async (docId,bookingId)=>{
    try {
        console.log('bbbbbid',bookingId);
        const result = await axiosApi.post(doctorRoute.confirmConsultation,{docId,bookingId})
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}