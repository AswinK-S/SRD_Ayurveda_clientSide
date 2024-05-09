import { useSelector } from 'react-redux'
import DocChatOnline from '../../components/chatOnline/DocChatOnline'
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
import { getUsers } from '../../api/userApi'


const DocMessage = () => {

    const navigate = useNavigate()
    const socket = useRef()

    const docData = useSelector((state) => state.doctor.doctor)
    const [conversation, setConverstion] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    const [showSendButton, setShowSendButton] = useState(false)

    const [usersForChat,setUsersForChat] = useState([])

    const [emoji, setEmoji] = useState(null)
    const [showEmoji, setShowEmoji] = useState(false)

    const token = localStorage.getItem('doctortoken')
    const currentUser = JSON.parse(docData)


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

    //get all users for chat from booking
    useEffect(()=>{
        const fetch= async()=>{
            const result = await getUsers(currentUser?._id)
            setUsersForChat(result)
        }
        fetch()
    },[])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    //get online users for chat
    useEffect(() => {
        socket.current.emit('addUser', currentUser?._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(usersForChat.filter((item)=>users.some((user)=>user.userId ===item?._id)))
        })
    }, [currentUser._id,usersForChat])



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
                    const result = await getConversation(currentUser?._id)
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

        if(text===''&& emoji===null || text.trim()===''){
            console.log('empty   chat---',text);
            return;
        }

        const receiverId = currentChat?.members.find((member) => member !== currentUser._id)
        socket.current.emit("sendMessage", {
            senderId: currentUser._id,
            receiverId,
            text
        })
        try {
            const conversationId = conversation.find(item => item._id)?._id;

            const result = await send(conversationId, currentUser?._id, text)
            setMessages(prevMessages => [...prevMessages, result])
            setText('')
            setEmoji(null)
            setShowEmoji(false)
            setShowSendButton(false)
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Nav />
            <div className='messenger bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 p-10 gap-4 '>

                <div className="chatMenu ">
                    <div className="chatMenuWrapper bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 shadow-md shadow-black">
                        <input placeholder='search' className='chatMenuInput' />
                        {conversation?.map((c) => (
                            <div key={c?._id} onClick={() => { setCurrentChat(c) }}>
                                <Conversation conversation={c} currentUser={currentUser} />
                            </div>

                        ))}

                    </div>
                </div>


                <div className="chatBox bg-gradient-to-r from-lime-200 via-lime-100 to-lime-200 shadow-md shadow-black ">
                    <div className="chatBoxWrapper  bg-">
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
                    <div className="chatOnlineWrapper rounded-md  bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 shadow-md shadow-black">
                        <DocChatOnline 
                         onlineUsers={onlineUsers} 
                         currentId={currentUser?._id}
                         setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>

            </div>
        </>

    )
}

export default DocMessage