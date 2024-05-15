import { useEffect, useState } from 'react'
import './chatOnline.css'
import propTypes from 'prop-types'
import { getConversations } from '../../api/conversationApi'
import {getUsers} from '../../api/userApi' 

const DocChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {

    const [users, setUsers] = useState([])
    const [liveUsers, setLiveUsers] = useState([])

     //get users for chat
     useEffect(() => {
        const fetch = async () => {
            const result = await getUsers(currentId)
            setUsers(result)
        }
        fetch()
    }, [currentId])

    //get online users
    useEffect(() => {
        setLiveUsers(users?.filter((online) => onlineUsers.some(onlineUser =>online?._id ===onlineUser?._id )))
    }, [users, onlineUsers])

    //get the conversation of each doctor
    const handleClick = async(onLineUser)=>{
        try {
            const result = await getConversations(currentId,onLineUser?._id)
            console.log('current chat --> in Dochat-->',result);
            setCurrentChat(result[0])
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <>
            <div className='chatOnline'>
                {liveUsers.map((onlineUser) => (
                    <div key={onlineUser?._id} className="chatOnlineFriend" onClick={() => { handleClick(onlineUser) }}>
                        <div className="chatOnlineImgContainer">
                            {onlineUser?.image ?
                                (<img className='chatOnlineImg' src={onlineUser?.image} alt="" />) :
                                (<div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                </div>)}
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{onlineUser?.name}</span>
                    </div>

                ))}
            </div>
        </>
    )
}


DocChatOnline.propTypes ={
    onlineUsers:propTypes.func.isRequired,
    currentId:propTypes.func.isRequired,
    setCurrentChat:propTypes.func.isRequired
}
export default DocChatOnline