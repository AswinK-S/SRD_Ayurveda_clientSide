import adminRoutes from "../services/endpoints/adminRoutes";
import axiosApi from "../services/api";
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
        let result = await axiosApi.post(`${adminRoutes.doctorStatus}/${id}`)
        console.log('doc---------------res', result);
        return result
    } catch (error) {
        console.log(error.message);
        throw (error)

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