import axios from "axios";


const axiosApi = axios.create({
    baseURL:import.meta.env.VITE_BACKEND,withCredentials:true,
    
})


const axiosCloudinaryApi= axios.create({
    baseURL:import.meta.env.VITE_CLOUDINARY_ROUTE
   
})

export{
    axiosCloudinaryApi,
    axiosApi
} 