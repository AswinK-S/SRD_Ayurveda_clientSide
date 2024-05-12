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
    const [usersForChat, setUsersForChat] = useState([])
    const [emoji, setEmoji] = useState(null)
    const [showEmoji, setShowEmoji] = useState(false)

    const [receiverId, setReceiverId] = useState('')

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


    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    //get all users for chat from booking
    useEffect(() => {
        const fetch = async () => {
            const result = await getUsers(currentUser?._id)
            console.log('users for chat --', result);
            setUsersForChat(result)
        }
        fetch()
    }, [currentUser?._id])

    //get online users for chat
    useEffect(() => {
        socket.current.emit('addUser', currentUser?._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(usersForChat.filter((item) => users.some((user) => user.userId === item?._id)))
        })
    }, [currentUser._id, usersForChat])


    const scrollRef = useRef()
    useEffect(() => {
        const fetch = async () => {
            try {
                if (currentUser) {
                    const result = await getConversation(currentUser?._id)
                    console.log('conversation in doc chat---', result);
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
            console.log('messages of doc side--', res);
            setMessages(res)
        }
        Messages()
    }, [currentChat?._id])

    // get id of the currentChat user
    const getCurrentChatId = async (c) => {
        const rcvrId = c?.members.find((item) => item !== currentUser?._id)
        console.log('current user-->', rcvrId, '  currentChat-->', c);
        setReceiverId(rcvrId)
        setCurrentChat(c)
    }


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

        if (text === '' && emoji === null || text.trim() === '') {
            console.log('empty   chat---', text);
            return;
        }
        console.log('receiver id',receiverId,'sender id',currentUser?._id);
        socket.current.emit("sendMessage", {
            senderId: currentUser?._id,
            receiverId,
            text
        })

        try {
            const conversationId = currentChat?._id
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
            <div className='  flex justify-center'>

                <div className='messenger  p-10 gap-5 '>

                    <div className="chatMenu ">
                        <div className="chatMenuWrapper rounded-md bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 shadow-md shadow-black">
                            <span className='chatlist'>Chat List</span>
                            <input placeholder='search' className='chatMenuInput' />
                            {conversation?.map((c) => (
                                <div key={c?._id} onClick={() => { getCurrentChatId(c) }}>
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
                            <span className='online'>Online</span>
                            <DocChatOnline
                                onlineUsers={onlineUsers}
                                currentId={currentUser?._id}
                                setCurrentChat={setCurrentChat}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default DocMessage