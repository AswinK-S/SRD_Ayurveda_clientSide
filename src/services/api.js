import axios from "axios";


const axiosApi = axios.create({
    baseURL:'http://localhost:3000',withCredentials:true
})


// const cloud_name = import.meta.env.Vite_cloud_name

const axiosCloudinaryApi= axios.create({
    baseURL:`https://api.cloudinary.com/v1_1/djmr6njuu/image/upload`
})

export{
    axiosCloudinaryApi,
    axiosApi
} 