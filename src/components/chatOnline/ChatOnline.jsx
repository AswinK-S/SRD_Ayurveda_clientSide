import { useEffect, useState } from 'react'
import './chatOnline.css'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getDoctors } from '../../api/userApi'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const [users,setUsers] = useState([])
    const [liveUsers,setLiveUsers] = useState([])
    
    const userData = useSelector((state)=>state.user.user)
    console.log('userData---->',userData);

    useEffect(()=>{
        const fetch = async ()=>{
            console.log('sending email to get doctors--',userData?.email);

            const result = await getDoctors(userData?.email)
            if(result.length){
                
            }
            console.log('result--');
        }
        fetch()
    },[userData])

    return (

        <>
            <div className='chatOnline'>
                <div className="chatOnlineFriend">
                    <div className="chatOnlineImgContainer">
                        <img className='chatOnlineImg' src="/3.jpg" alt="" />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">Roshan</span>
                </div>

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