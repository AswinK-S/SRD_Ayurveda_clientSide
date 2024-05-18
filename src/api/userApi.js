import userRoutes from "../services/endpoints/userRoutes";
import { axiosApi } from "../services/api";

//login route
export const login = async (loginData) => {
    try {
        const response = await axiosApi.post(userRoutes.login, loginData)
        return response
    } catch (error) {
        return error.response.data.message
    }
}

export const treatments = async () => {
    try {
        const res = await axiosApi.get(userRoutes.treatments)
        return res
    } catch (error) {
        return error.message
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
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}


//signup route
export const signup = async (resgisterData) => {
    try {
        const response = await axiosApi.post(userRoutes.signup, resgisterData)
        return response
    } catch (error) {
        return error.message

    }
}

//resend otp
export const resendOtp = async (signupData) => {
    try {
        const result = await axiosApi.post(userRoutes.resendOtp, signupData)
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}

//verify email for forget password
export const verifyEmail = async(email)=>{
    try {
        const result = await axiosApi.post(userRoutes.verifyMail,{email})
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
        const result = await axiosApi.post(userRoutes.submitOtp,{email,otp})
        return result.data

    } catch (error) {
        console.log(error.message);
    }
}

//update password for forgot password functionality
export const updatePassword = async(newPassword,email)=>{
    try{
        const result = await axiosApi.patch(userRoutes.updatePassword,{newPassword,email})
        return result?.data?.message

    }catch(error){
        console.log(error.message);
    }
}


//changePassword
export const changePassword =async(id,password)=>{
    try {
        const result = await axiosApi.patch(`${userRoutes.changePassword}?id=${id}&password=${password}`)
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}

// upload profile picture 
export const profileImageUpload =async(image)=>{
    try {
        console.log('formdata- pro img',image);
        const result = await axiosApi.post(userRoutes.uploadProfileImage,image)
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}

//update userProfile
export const updateUserData = async(formData)=>{
    try {
        const result = await axiosApi.patch(userRoutes.updateProfile,formData)
        return result?.data
    } catch (error) {
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
        const res = await axiosApi.get(`${userRoutes.doctor}/${slotData?.sbTrtmntId}/${slotData?.date}`)
        return res
    } catch (error) {
        console.log(error.message);
    }
}

//get bookings detailfor user
export const bookings = async (email,page,pageSize)=>{
    try {
        const result = await axiosApi.get(`${userRoutes.bookings}/${email}/${page}/${pageSize}`);
        return result?.data
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
        console.log('booking details-----dddd',result?.data);
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}

//stripe payment
export const payment = async (bookingDetail) => {
    try {
        const result = await axiosApi.post(userRoutes.payment, bookingDetail)
        return result;

    } catch (error) {
        console.log(error.message);
    }
}

//get doctors list for chat 
export const getDoctors = async(email)=>{
    try {
        const result = await axiosApi.get(`${userRoutes.bookedDoctors}?email= ${email}`);
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}


//get users chat from booking for doctor
export const getUsers =async(docId)=>{
    try {
        const result = await axiosApi.get(`${userRoutes.getUsers}/${docId}`)
        return  result?.data
    } catch (error) {
        console.log(error.message);
    }
}

// cancel booking 
export const cancelBooking =async(id,amount)=>{
    try {
        const result = await axiosApi.put(`${userRoutes.cancelBooking}/${id}/${amount}`)
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}