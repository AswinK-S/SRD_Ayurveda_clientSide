import axios from "axios";


const axiosApi = axios.create({
    baseURL:import.meta.env.VITE_BACKEND,withCredentials:true
})


// const cloud_name = import.meta.env.Vite_cloud_name

const axiosCloudinaryApi= axios.create({
    baseURL:import.meta.env.VITE_CLOUDINARY_ROUTE
})

export{
    axiosCloudinaryApi,
    axiosApi
} 