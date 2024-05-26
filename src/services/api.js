import axios from "axios";


const axiosApi = axios.create({
    baseURL:import.meta.env.VITE_BACKEND,withCredentials:true
    // baseURL:"http://localhost:3000",withCredentials:true
    
})


// const cloud_name = import.meta.env.Vite_cloud_name

const axiosCloudinaryApi= axios.create({
    baseURL:import.meta.env.VITE_CLOUDINARY_ROUTE
    // baseURL:'https://api.cloudinary.com/v1_1/djmr6njuu/image/upload'
})

export{
    axiosCloudinaryApi,
    axiosApi
} 