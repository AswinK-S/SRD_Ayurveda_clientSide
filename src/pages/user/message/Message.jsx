import { useSelector } from 'react-redux'
import ChatOnline from '../../../components/chatOnline/ChatOnline'
import Conversation from '../../../components/conversations/Conversation'
import Footer from '../../../components/footer/footer'
import Messages from '../../../components/message/Messages'
import Nav from '../../../components/navbar/nav'
import './Message.css'
import { useEffect, useState } from 'react'
import { getConversation, getMessages } from '../../../api/conversationApi'


const Message = () => {

    const currentUser = useSelector((state) => state.user.user)
    // console.log('user-->',currentUser);
    const [conversation, setConverstion] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])


    useEffect(() => {
        const fetch = async () => {

            try {
                if (currentUser) {
                    const result = await getConversation(currentUser?._id)
                    console.log('cnvrstn--->', result);
                    setConverstion(result)
                } else {
                    console.log('no user');
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetch()
    }, [currentUser])

    useEffect(()=>{
            const Messages = async()=>{
                const res = await getMessages(currentChat?._id)
                setMessages(res)
                console.log('messages--',res);
            }
            Messages()
    },[currentChat?._id])

    return (
        <>
            <Nav />
            <div className='messenger bg-white p-10 '>

                <div className="chatMenu ">
                    <div className="chatMenuWrapper">
                        <input placeholder='search' className='chatMenuInput' />
                        {conversation?.map((c) => (
                            <div key={c?._id} onClick={()=>{setCurrentChat(c)}}>
                                <Conversation  conversation={c} currentUser={currentUser} />
                            </div>
    
                        ))}

                    </div>
                </div>


                <div className="chatBox ">
                    <div className="chatBoxWrapper">
                        { currentChat?  (<>
                            <div className="chatBoxTop">
                               {messages.map((m)=>(
                                     <Messages key={m?._id} message={m} own={m.sender ===currentUser._id}/>

                               ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea className='chatMessageInput rounded-md' placeholder='write something..'></textarea>
                                <button className='chatSubmitButton'>Send</button>

                            </div>
                        </>):(<span className='noConversation'>Open a conversation to start a chat </span>)
                        }
                    </div>
                </div>


                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>

            </div>
            <Footer />
        </>

    )
}

export default Message