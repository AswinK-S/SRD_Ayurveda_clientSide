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
export const treatments = async ()=>{
    try {
        console.log('req for trtmnt in api');
        const res = await axiosApi.get(adminRoutes.treatments)
        console.log('res in api',res);
        return res
    } catch (error) {
        console.log(error.message);
    }
}

//get single treatmentdetail
export const treatment = async(id)=>{
    try{
        console.log('02020---',id);
        const result = await axiosApi.get(`${adminRoutes.treatment}/${id}`)
        return result
    }catch(error){
        console.log(error.message);
    }
}

//add Treatments
export const addTreatments = async(data)=>{
    try {
        console.log('add trtmnt',data);
        const res =await axiosApi.post(adminRoutes.addTreat,data)
        console.log(res);
        return res
    } catch (error) {
        console.log('err frm addtrnmnts',error.message);
    }
}

//change treatment Status
export const trtMntStatus = async(id)=>{
    try {
        console.log('trt id ---',id);
        const result = await axiosApi.patch(`${adminRoutes.treatmentStatus}/${id}`)
        return result
    } catch (error) {
        console.log(error.message);
    }
}

//remove subTreatment
export const removeSubTreatment = async(editData)=>{
    console.log('edit data----',editData);
    const result = await axiosApi.delete(adminRoutes.removeSub_trtmnt,{data:editData})
    return result
}

// edit Treatment
export const updateTreatment =async(data)=>{
    try {
        console.log('iid----',data);
        const result = await axiosApi.patch(adminRoutes.editTrtmnt,data)
        console.log('rslt in api--',result  );
        return result
    } catch (error) {
        console.log(error.message);
    } 
}

//add Doctors
export const addDoctor = async(doctorData)=>{
    try {
        console.log('doc data to submit--',doctorData);
        const res = await axiosApi.post(adminRoutes.addDoctor,doctorData)
        console.log('add doc res',res);
        return res
    } catch (error) {
        console.log(error.message);
    }
}

//get doctors
export const doctors = async () => {
    try {
        console.log('req in doctors');
        let res = await axiosApi.get(adminRoutes.doctors)
        console.log('res doctors', res.data);
        return res
    } catch (error) {
        console.log(error.message);
        throw (error)
    }
}

//doctor status
export const doctorStatus = async (id) => {
    try {
        console.log('doctor id', id);
        const result = await axiosApi.post(`${adminRoutes.doctorStatus}/${id}`)
        console.log('doc---------------res', result);
        return result
    } catch (error) {
        console.log(error.message);
        throw (error)

    }
}

// verify doctor 
export const verifyDoctor = async(id)=>{
    try {
        console.log('id-- in api',id);
        const result = await axiosApi.post(`${adminRoutes.verifyDoc}/${id}`) 
        return result
    } catch (error) {
        console.log(error.message)
    }
}

// get users 
export const users = async () => {
    try {
        console.log('get users req');
        let response = await axiosApi.get(adminRoutes.users)
        console.log('res frm user', response);
        return response
    } catch (err) {
        console.log(err.message)
        throw (err)

    }
}

//user status
export const userStatus = async (id) => {
    console.log('api usrsts ---', id);
    let res = await axiosApi.post(`${adminRoutes.userStatus}/${id}`)
    console.log('res usrsts--', res);
    return res
}