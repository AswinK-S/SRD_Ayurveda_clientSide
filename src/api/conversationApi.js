import { axiosApi } from "../services/api";
import conversationRoute from '../services/endpoints/conversationRoutes'
import messagesRoute from "../services/endpoints/messageRoute";


//get userDetails
export const getUserData = async(userId)=>{
    try {
        const result = await axiosApi.get(`${conversationRoute.getUser}/${userId}`)
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}

//get conversation details
export const getConversation = async(userId)=>{
    try {
        const result = await axiosApi.get(`${conversationRoute.getConversation}/${userId}`)
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}

//get conv includes two userId
export const getConversations = async(firstId,secondId)=>{
    try {
        const result = await axiosApi.get(`${conversationRoute.getConversations}/${firstId}/${secondId}`)
        return result.data;
    } catch (error) {
      console.log(error.message);  
    }
}



//get messages 
export const getMessages = async (converSationId)=>{
    try {
        console.log('get messages----',converSationId);
        const result = await axiosApi.get(`${messagesRoute.getMessages}/${converSationId}`)
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}

// send message 
export const send = async(conversationId,sender,text)=>{
    try {
        const result= await axiosApi.post(messagesRoute.sendMessage,{conversationId,sender,text})
        return result.data

    } catch (error) {
        console.log(error.message);
    }
}

//upload media 
export const uploadMedia = async(formData)=>{
    try {
        console.log('rrr--',formData);
        const result = await axiosApi.post(messagesRoute.sendMedia,formData)
        console.log('media link',result);
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}