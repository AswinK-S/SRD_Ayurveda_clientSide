import { useSelector } from 'react-redux'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/doctor/DocConversation'
import Messages from '../../components/doctor/DocMessage'
import Nav from '../../components/doctor/docNav'
import '../user/message/Message.css'
import { useEffect, useRef, useState } from 'react'
import { getConversation, getMessages, send } from '../../api/conversationApi'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const DocMessage = () => {

    const navigate = useNavigate()

    const docData = useSelector((state) => state.doctor.doctor)
    const [conversation, setConverstion] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')

    const token=localStorage.getItem('doctortoken')
    const currentUser =JSON.parse(docData)

    console.log('currnt user---000000>',currentUser);

    useEffect(()=>{
        if(token){       
            const decode = jwtDecode(token)
            if(!decode.role==='doctor'){
                console.log('no doc');
                navigate('/doctor')
            }
        }else{
            console.log('no doctoken');
            navigate('/doctor')
        }
    },[navigate,token])

    const scrollRef = useRef()
    useEffect(() => {
        const fetch = async () => {

            try {
                if (currentUser) {
                    console.log('current user id', currentUser?._id);
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
    }, [])

    //get messages
    useEffect(() => {
        const Messages = async () => {
            const res = await getMessages(currentChat?._id)
            setMessages(res)
            console.log('messages--', res);
        }
        Messages()
    }, [currentChat?._id])

    const messageHandler = (e) => {
        setText(e.target.value)
    }


    //automatic scroll when there is new message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    //send message
    const sendMessage = async (e) => {
        e.preventDefault()
        try {
            const conversationId = conversation.find(item => item._id)?._id;
            console.log('cnvrstn id=', conversationId, 'sndr-', currentUser?._id, 'text--', text);
            const result = await send(conversationId, currentUser?._id, text)
            console.log('result ---', result);
            setMessages(prevMessages => [...prevMessages, result])
            setText('')
        } catch (error) {
            console.log(error.message);
        }
    }
    console.log('messages---->',messages);
    return (
        <>
            <Nav />
            <div className='messenger bg-white p-10 '>

                <div className="chatMenu ">
                    <div className="chatMenuWrapper">
                        <input placeholder='search' className='chatMenuInput' />
                        {conversation?.map((c) => (
                            <div key={c?._id} onClick={() => { setCurrentChat(c) }}>
                                <Conversation conversation={c} currentUser={currentUser} />
                            </div>

                        ))}

                    </div>
                </div>


                <div className="chatBox ">
                    <div className="chatBoxWrapper">
                        {currentChat ? (<>
                            <div className="chatBoxTop">
                                {messages.map((m) => (
                                    <div key={m?._id} ref={scrollRef}>
                                        <Messages message={m} own={m.sender === currentUser._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea className='chatMessageInput rounded-md' placeholder='write something..' value={text} onChange={messageHandler} ></textarea>
                                {text ?
                                    (<button className='chatSubmitButton' onClick={sendMessage} >Send</button>) : (null)}

                            </div>
                        </>) : (<span className='noConversation'>Open a conversation to start a chat </span>)
                        }
                    </div>
                </div>


                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>

            </div>
        </>

    )
}

export default DocMessage