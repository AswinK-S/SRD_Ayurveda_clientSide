import { useEffect, useState } from 'react'
import './chatOnline.css'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getDoctors } from '../../api/userApi'
import { getConversations } from '../../api/conversationApi'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const [users, setUsers] = useState([])
    const [liveUsers, setLiveUsers] = useState([])
    const [userData,setUserData] = useState([])
    //to find doctors from booking using userEmail
    const user = useSelector((state) => state.user.user)


    useEffect(()=>{
        if(user?.user?.isGoogle){
            setUserData(user?.user)
        }else{
            setUserData(user)
        }
    },[user])

    //get doctors for chat
    useEffect(() => {
        const fetch = async () => {
            if(userData?.email){
                const result = await getDoctors(userData?.email)
                setUsers(result)
            }
        }
        fetch()
    }, [userData])

    //get online users
    useEffect(() => {
        if(users){
        setLiveUsers(users?.filter((online) => onlineUsers?.some(onlineUser =>online?._id ===onlineUser?._id )))

        }
    }, [users, onlineUsers])


    //get the conversation of each doctor
    const handleClick = async(onLineUser)=>{
        try {
            const result = await getConversations(currentId,onLineUser?._id)
            setCurrentChat(result[0])
        } catch (error) {
            console.log(error.message);
        }
    }


    return (

        <>
            <div className='chatOnline'>
                {liveUsers.map((onlineUser) => (
                    <div key={onlineUser?._id} className="chatOnlineFriend" onClick={()=>{handleClick(onlineUser)}}>
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

ChatOnline.propTypes = {
    onlineUsers: propTypes.func.isRequired,
    currentId: propTypes.func.isRequired,
    setCurrentChat: propTypes.func.isRequired

}

export default ChatOnline