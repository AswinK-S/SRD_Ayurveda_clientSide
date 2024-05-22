import { axiosApi } from "../services/api";
import conversationRoute from '../services/endpoints/conversationRoutes'
import messagesRoute from "../services/endpoints/messageRoute";


//get userDetails
export const getUserData = async(userId)=>{
    try {
        console.log('get users info');
        const result = await axiosApi.get(`${conversationRoute.getUser}/${userId}`)
        return result.data
    } catch (error) {
        console.log(error.message);
    }
}

//get conversation details
export const getConversation = async(userId)=>{
    try {
        console.log('cnvrstn');
        const result = await axiosApi.get(`${conversationRoute.getConversation}/${userId}`)
        return result?.data
    } catch (error) {
        console.log('yyyyy',error.message);
        return error.message
    }
}

//get conv includes two userId
export const getConversations = async(firstId,secondId)=>{
    try {
        const result = await axiosApi.get(`${conversationRoute.getConversations}/${firstId}/${secondId}`)
        return result.data;
    } catch (error) {
      console.log('pppppp',error.message);  
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
        console.log('sending msg-- cId--',conversationId,'sender--',sender,'text--',text);
        const result= await axiosApi.post(messagesRoute.sendMessage,{conversationId,sender,text})
        console.log('send msg rslt---',result);
        return result.data

    } catch (error) {
        console.log(error.message);
    }
}

//upload media to cloudinary
export const uploadMedia = async(formData)=>{
    try {   
        const result = await axiosApi.post(messagesRoute.sendMedia,formData)
        console.log('upload lnk',result);
        return result.data
    } catch (error) {
        return error.response
    }
}

//store the chat  media to db
export const storeMedia =async(conversationId,sender, mediaUrl)=>{
    try{
        const result = await axiosApi.post(messagesRoute.storeMedia,{conversationId,sender, mediaUrl})
        return result.data
    }catch(error){
        console.log(error.message);
    }
}