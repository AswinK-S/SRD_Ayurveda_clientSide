import { useSelector } from 'react-redux'
import ChatOnline from '../../../components/chatOnline/ChatOnline'
import Conversation from '../../../components/conversations/Conversation'
import Footer from '../../../components/footer/footer'
import Messages from '../../../components/message/Messages'
import Nav from '../../../components/navbar/nav'
import './Message.css'
import { useEffect, useRef, useState } from 'react'
import { getConversation, getMessages, send } from '../../../api/conversationApi'

import { io } from 'socket.io-client'

const Message = () => {



    const currentUser = useSelector((state) => state.user.user)
    const [conversation, setConverstion] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)

    const socket = useRef()

    //connect to socket server
    useEffect(() => {
        socket.current = io('ws://localhost:3001')

        socket?.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })

    }, [])



    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    useEffect(() => {
        socket.current.emit('addUser', currentUser._id)
        socket.current.on("getUsers", users => {
            console.log('online users', users);
        })
    }, [currentUser])



    const scrollRef = useRef()
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

        console.log('currnt chat----', currentChat);
        const receiverId = currentChat.members.find((item) => item !== currentUser._id)//--------------------- >-id
        console.log('recvr id----', receiverId);
        console.log('text-- sending0000', text);
        socket.current.emit("sendMessage", {
            senderId: currentUser._id,
            receiverId,
            text
        })
        try {
            const conversationId = conversation.find(item => item._id)?._id;
            // console.log('cnvrstn id=', conversationId, 'sndr-', currentUser._id, 'text--', text);


            const result = await send(conversationId, currentUser._id, text)
            console.log('result ---', result);
            setMessages(prevMessages => [...prevMessages, result])
            setText('')
        } catch (error) {
            console.log(error.message);
        }
    }

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
                                        <Messages message={m} own={m.sender === currentUser?._id} />
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
            <Footer />
        </>

    )
}

export default Message