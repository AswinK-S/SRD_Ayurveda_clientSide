import { axiosApi } from "../services/api";
import conversationRoute from '../services/endpoints/conversationRoutes'


//get conversation details
export const getConversation = async(userId)=>{
    try {
        console.log('sending data to bknd',userId);
        const result = await axiosApi.get(`${conversationRoute.getConversation}/${userId}`)
        console.log('rslt -->',result);
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}

//get messages 
export const getMessages = async ()=>{
    try {
        const result = await axiosApi.get()
    } catch (error) {
        console.log(error.message);
    }
}