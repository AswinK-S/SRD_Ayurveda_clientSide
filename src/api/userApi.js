import userRoutes from "../services/endpoints/userRoutes";
import { axiosApi } from "../services/api";

//login route
export const login = async (loginData) => {
    try {
        console.log('login data :', loginData);
        console.log('------------');
        const response = await axiosApi.post(userRoutes.login, loginData)
        console.log('------', response);
        console.log('response :', response);
        return response
    } catch (error) {
        console.error("axios error :", error.response.data.message);

        return error.response.data.message
    }
}

export const treatments = async () => {
    try {
        const res = await axiosApi.get(userRoutes.treatments)
        return res
    } catch (error) {
        console.log(error.message);
    }
}

//otp submition route
export const registerUser = async (otp, email) => {
    try {
        const response = await axiosApi.post(userRoutes.registerUser, { otp: otp, email: email })
        return response
    } catch (error) {
        if (error.response) {
            return error?.response?.data?.message||'something went wrong'
        }
    }
}

//google signUp
export const googleAuth = async(userDetail)=>{
    try {
        const result = await axiosApi.post(userRoutes.googleAuth,userDetail)
        console.log('g sgn Up -->',result);
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}


//signup route
export const signup = async (resgisterData) => {
    try {
        console.log('register details :', resgisterData);
        const response = await axiosApi.post(userRoutes.signup, resgisterData)
        console.log('signup response', response);
        return response
    } catch (error) {
        console.log('register err  :', error.message);
        return error.message

    }
}

//resend otp
export const resendOtp = async (signupData) => {
    try {
        const result = await axiosApi.post(userRoutes.resendOtp, signupData)
        console.log('----result', result);
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}

//verify email for forget password
export const verifyEmail = async(email)=>{
    try {
        const result = await axiosApi.post(userRoutes.verifyMail,{email})
        console.log('result-----00',result);
        return result.data.message
    } catch (error) {
        if(error.response){
            console.log(error?.response);

        }
    }
}

//verify otp for forget Password
export const submitOtp = async(email,otp)=>{
    try {
        console.log('sbt---');
        const result = await axiosApi.post(userRoutes.submitOtp,{email,otp})
        console.log('res---',result);
        return result.data

    } catch (error) {
        console.log(error.message);
    }
}

//update password for forgot password functionality
export const updatePassword = async(newPassword,email)=>{
    try{
        const result = await axiosApi.patch(userRoutes.updatePassword,{newPassword,email})
        console.log('rrsslt---',result);
        return result?.data?.message

    }catch(error){
        console.log(error.message);
    }
}

// get treatments for online booking
export const getTreatments = async () => {
    try {
        const res = await axiosApi.get(userRoutes.treatments)
        return res
    } catch (error) {
        console.log(error.message);
    }
}

// get doctors according to the treatment
export const doctor = async (slotData) => {
    try {
        console.log('id to bcknd------', slotData);
        const res = await axiosApi.get(`${userRoutes.doctor}/${slotData?.sbTrtmntId}/${slotData?.date}`)
        console.log('object', res);
        return res
    } catch (error) {
        console.log(error.message);
    }
}

//get bookings detailfor user
export const bookings = async (email,page)=>{
    try {
        const result = await axiosApi.get(`${userRoutes.bookings}?email=${email}&page=${page}`)
        console.log('bkng details-->',result);
        return result.data
    } catch (error) {
        console.log(error.response);

    }
} 

//get user booking detail
export const bookingDetail = async (docId, treatmentId, subTreatmentId) => {
    try {
        const booking = {
            docId: docId,
            treatmentId: treatmentId,
            sbTrtmntId: subTreatmentId
        }
        const params = new URLSearchParams(booking).toString()
        const result = await axiosApi.get(`${userRoutes.getBkngDtails}?${params}`)
        console.log('bkng rslt--', result);
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}

//stripe payment
export const payment = async (bookingDetail) => {
    try {
        console.log('bkng details--', bookingDetail);
        const result = await axiosApi.post(userRoutes.payment, bookingDetail)
        console.log('result-----2', result);
        return result;

    } catch (error) {
        console.log(error.message);
    }
}

