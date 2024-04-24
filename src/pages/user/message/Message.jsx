import { useSelector } from 'react-redux'
import ChatOnline from '../../../components/chatOnline/ChatOnline'
import Conversation from '../../../components/conversations/Conversation'
import Footer from '../../../components/footer/footer'
import Messages from '../../../components/message/Messages'
import Nav from '../../../components/navbar/nav'
import './Message.css'
import { getConversation } from '../../../api/userApi'
import { useEffect, useState } from 'react'

const Message = () => {

    const currentUser = useSelector((state)=>state.user.user)
    // console.log('user-->',currentUser);
    const [conversation,setConverstion] = useState([])

    useEffect(()=>{
        const fetch = async()=>{
          
            try {
                if(currentUser){
                const result = await getConversation(currentUser._id)
                console.log('cnvrstn--->',result);
                setConverstion(result)
                }else{
                    console.log('no user');
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetch()
    },[currentUser])

    return (
        <>
            <Nav />
            <div className='messenger bg-white p-10 '>

                <div className="chatMenu ">
                    <div className="chatMenuWrapper">
                        <input placeholder='search' className='chatMenuInput' />
                        {conversation.map((c)=>(
                            <Conversation key={c._id} conversation={c} currentUser={currentUser}/>
                        ))}
                      
                    </div>
                </div>


                <div className="chatBox ">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Messages />
                            <Messages own={true}/>
                            <Messages />
                            <Messages own={true}/>
                            <Messages />
                            <Messages own={true}/>
                            <Messages />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className='chatMessageInput rounded-md'  placeholder='write something..'></textarea>
                            <button className='chatSubmitButton'>Send</button>
                        </div>
                    </div>
                </div>


                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline/>
                    </div>
                </div>

            </div>
            <Footer/>
        </>

    )
}

export default Message