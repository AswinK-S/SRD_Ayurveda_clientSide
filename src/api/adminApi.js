import adminRoutes from "../services/endpoints/adminRoutes";
import { axiosApi } from "../services/api";
import { toast } from 'react-toastify'

//login
export const login = async (loginData) => {
    try {
        console.log('admin login data :', loginData);
        let res = await axiosApi.post(adminRoutes.login, loginData)
        console.log('ad lgn res :', res);
        toast.success(res?.data?.message)
        return res
    } catch (err) {
        console.log('admin login error :', err);
        toast.error(err?.response?.data?.message)
    }
}

//get Treatments
export const treatments = async () => {
    try {
        const res = await axiosApi.get(adminRoutes.treatments)
        return res
    } catch (error) {
        console.log(error.message);
    }
}

//get single treatmentdetail
export const treatment = async (id) => {
    try {
        const result = await axiosApi.get(`${adminRoutes.treatment}/${id}`)
        return result
    } catch (error) {
        console.log(error.message);
    }
}

//add Treatments
export const addTreatments = async (data) => {
    try {
        const res = await axiosApi.post(adminRoutes.addTreat, data)
        console.log(res);
        return res
    } catch (error) {
        console.log(error.message);
    }
}



//change treatment Status
export const trtMntStatus = async (id) => {
    try {
        const result = await axiosApi.patch(`${adminRoutes.treatmentStatus}/${id}`)
        return result
    } catch (error) {
        console.log(error.message);
    }
}

//remove subTreatment
export const removeSubTreatment = async (editData) => {
    try{
    const result = await axiosApi.delete(adminRoutes.removeSub_trtmnt, { data: editData })
    return result
    }catch(error){
        console.log(error.message);
    }
}

//edit Treatment Name
export const editTrtmntName = async (trtmnt, editTrtmntId) => {
    try {
        const result = await axiosApi.patch(adminRoutes.editTreatmentName, { name: trtmnt, id: editTrtmntId })
        return result
    } catch (error) {
        console.log(error.message);
    }
}

// edit Treatment
export const updateTreatment = async (data) => {
    try {
        const result = await axiosApi.patch(adminRoutes.editTrtmnt, data)
        return result
    } catch (error) {
        console.log(error.message);
    }
}

//add Doctors
export const addDoctor = async (doctorData) => {
    try {
        const res = await axiosApi.post(adminRoutes.addDoctor, doctorData)
        return res
    } catch (error) {
        console.log(error.message);
    }
}

//get doctors
export const doctors = async () => {
    try {
        let res = await axiosApi.get(adminRoutes.doctors)
        return res
    } catch (error) {
        console.log(error.message);
        throw (error)
    }
}

//doctor status
export const doctorStatus = async (id) => {
    try {
        const result = await axiosApi.post(`${adminRoutes.doctorStatus}/${id}`)
        return result
    } catch (error) {
        console.log(error.message);
        throw (error)

    }
}

// verify doctor 
export const verifyDoctor = async (id) => {
    try {
        const result = await axiosApi.post(`${adminRoutes.verifyDoc}/${id}`)
        return result
    } catch (error) {
        console.log(error.message)
    }
}

// get users 
export const users = async (currentPage) => {
    try {
        const response = await axiosApi.get(`${adminRoutes.users}?page=${currentPage}`);
        return response.data
    } catch (err) {
        console.log(err.message)
        throw (err)

    }
}

//user status
export const userStatus = async (id) => {
        const res = await axiosApi.post(`${adminRoutes.userStatus}/${id}`);
        return res
    
}    