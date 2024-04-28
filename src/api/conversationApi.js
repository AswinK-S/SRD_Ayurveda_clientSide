import { axiosApi } from "../services/api";
import conversationRoute from '../services/endpoints/conversationRoutes'
import messagesRoute from "../services/endpoints/messageRoute";


//get userDetails
export const getUserData = async(userId)=>{
    try {
        console.log('usrId',userId);
        const result = await axiosApi.get(`${conversationRoute.getUser}/${userId}`)
        console.log('user ifo0000-----',result);
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}

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
export const getMessages = async (converSationId)=>{
    try {
        const result = await axiosApi.get(`${messagesRoute.getMessages}/${converSationId}`)
        console.log('rs in msg rt-->',result);
        return result?.data
    } catch (error) {
        console.log(error.message);
    }
}

// send message 
export const send = async(conversationId,sender,text)=>{
    try {
        console.log('cnvrstn id----',conversationId,'sender id---->',sender,'text--->',text);
        const result= await axiosApi.post(messagesRoute.sendMessage,{conversationId,sender,text})
        console.log('snd msg rslt--',result);
        return result.data

    } catch (error) {
        console.log(error.message);
    }
}