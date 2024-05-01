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

import { io } from "socket.io-client"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosSend } from "react-icons/io";


const DocMessage = () => {

    const navigate = useNavigate()
    const socket = useRef()

    const docData = useSelector((state) => state.doctor.doctor)
    const [conversation, setConverstion] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)

    const [showSendButton, setShowSendButton] = useState(false)


    const [emoji, setEmoji] = useState(null)
    const [showEmoji, setShowEmoji] = useState(false)

    const token = localStorage.getItem('doctortoken')
    const currentUser = JSON.parse(docData)

    // console.log('currnt user---000000>', currentUser);

    //conecting socket
    useEffect(() => {
        socket.current = io('ws://localhost:3001')

        socket.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [socket])



    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    useEffect(() => {
        socket.current.emit('addUser', currentUser?._id)
        socket.current.on("getUsers", users => {
            console.log('online users in doc side', users);
        })
    }, [currentUser])



    useEffect(() => {
        if (token) {
            const decode = jwtDecode(token)
            if (!decode.role === 'doctor') {
                console.log('no doc');
                navigate('/doctor')
            }
        } else {
            console.log('no doctoken');
            navigate('/doctor')
        }
    }, [navigate, token])

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
        setShowSendButton(true)

    }

 

    //automatic scroll when there is new message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])


    // add emoji 
    const addEmoji = (emojiObject) => {
        console.log('choose emoji----', emojiObject.native);
        setEmoji(emojiObject.native);
        setText(text + emojiObject.native);

        setShowSendButton(true)

    };

    const toggleEmojiPicker = () => {
        setShowEmoji(!showEmoji)

    }

    //send message
    const sendMessage = async (e) => {
        e.preventDefault()

        const receiverId = currentChat?.members.find((member) => member !== currentUser._id)
        socket.current.emit("sendMessage", {
            senderId: currentUser._id,
            receiverId,
            text: text + (emoji ? emoji : '')
        })
        try {
            const conversationId = conversation.find(item => item._id)?._id;
            console.log('cnvrstn id=', conversationId, 'sndr-', currentUser?._id, 'text--', text);

            const result = await send(conversationId, currentUser?._id, text)
            console.log('result ---', result);
            setMessages(prevMessages => [...prevMessages, result])
            setText('')
            setShowEmoji(false)
            setShowSendButton(false)
        } catch (error) {
            console.log(error.message);
        }
    }
    console.log('messages---->', messages);
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
                        {showEmoji &&
                            <div className='emojiPickerContainer'>
                                <Picker perLine={7} emojiSize={20} emojiButtonSize={28} className='custom-picker-class' data={data} onEmojiSelect={addEmoji} />
                            </div>
                        }
                        {currentChat ? (<>
                            <div className="chatBoxTop">
                                {messages.map((m) => (
                                    <div key={m?._id} ref={scrollRef}>
                                        <Messages message={m} own={m.sender === currentUser._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <span onClick={toggleEmojiPicker} style={{ fontSize: '30px', cursor: 'pointer' }} className="emojiIcon"><MdOutlineEmojiEmotions /></span>

                                <textarea type='text' className='chatMessageInput rounded-md' placeholder='write something..' value={text} onChange={messageHandler} ></textarea>
                                {showSendButton ?
                                    (<button className='chatSubmitButton rounded-full ' style={{ fontSize: '30px', cursor: 'pointer', alignItems: 'center', justifyContent: "center", display: 'flex' }} onClick={sendMessage} >
                                        <IoIosSend />
                                    </button>) : (null)}
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