import axios from "axios";

console.log('object',import.meta.env.VITE_BACKEND)


const axiosApi = axios.create({
    baseURL:import.meta.env.VITE_BACKEND,withCredentials:true,
    // baseURL:"http://localhost:3000",withCredentials:true
    
})


const axiosCloudinaryApi= axios.create({
    baseURL:import.meta.env.VITE_CLOUDINARY_ROUTE
    // baseURL:'https://api.cloudinary.com/v1_1/djmr6njuu/image/upload'
})

export{
    axiosCloudinaryApi,
    axiosApi
} 