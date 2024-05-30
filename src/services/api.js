import axios from "axios";

console.log('bcknd',import.meta.env.VITE_BACKEND)
console.log('cldnry',import.meta.env.VITE_CLOUDINARY_ROUTE);


const axiosApi = axios.create({
    baseURL:import.meta.env.VITE_BACKEND,withCredentials:true,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': import.meta.env.VITE_BACKEND
      }
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