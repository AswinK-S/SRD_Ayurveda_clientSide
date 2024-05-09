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
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { getDoctors } from '../../../api/userApi'



const Message = () => {
    const currentUser = useSelector((state) => state.user.user)
    const [conversation, setConverstion] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [showSendButton, setShowSendButton] = useState(false)

    const [doctors, setDoctors] = useState([])
    const socket = useRef()

    const [emoji, setEmoji] = useState(null)
    const [showEmoji, setShowEmoji] = useState(false)


    //connect to socket server
    useEffect(() => {
        socket.current = io('ws://localhost:3001')

        socket?.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data?.senderId,
                text: data?.text,
                createdAt: Date.now()
            })
        })

    }, [socket])



    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage?.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])

    }, [arrivalMessage, currentChat])

    //get all doctors from the bookings for chat
    useEffect(() => {
        const fetch = async () => {
            const result = await getDoctors(currentUser?.email)
            setDoctors(result)
        }
        fetch()
    }, [currentUser])

    useEffect(() => {
        socket.current.emit('addUser', currentUser?._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(doctors?.filter((doc) => users?.some((user) => user.userId === doc?._id)))
        })
    }, [currentUser, text, doctors])



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
    }, [currentUser])

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
        setEmoji(emojiObject?.native);
        setText(text + emojiObject?.native)
        setShowSendButton(true)

    };

    const toggleEmojiPicker = () => {
        setShowEmoji(!showEmoji)

    }

    //send message
    const sendMessage = async (e) => {
        e.preventDefault()
        console.log('sending msg----->', text);
        if (text === '' && emoji === null || text.trim() === '') {
            console.log('empty   chat---', text);
            return;
        }

        const receiverId = currentChat?.members.find((item) => item !== currentUser?._id)
        socket.current.emit("sendMessage", {
            senderId: currentUser?._id,
            receiverId,
            text
        })
        try {
            const conversationId = conversation?.find(item => item._id)?._id;
            const result = await send(conversationId, currentUser._id, text)
            console.log('result ---', result);
            setMessages(prevMessages => [...prevMessages, result])
            setText('')
            setEmoji(null)
            setShowEmoji(false)
            setShowSendButton(false)


        } catch (error) {
            console.log(error.message);
        }
    }

    // console.log('current chat -----',currentChat);

    return (
        <>
            <Nav />
            <div className='messenger  bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 p-10 gap-4 '>

                <div className="chatMenu ">
                    <div className="chatMenuWrapper rounded-md  bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 shadow-md shadow-black">
                        <input placeholder='search' className='chatMenuInput' />
                        {conversation?.map((c) => (
                            <div key={c?._id} onClick={() => { setCurrentChat(c) }}>
                                <Conversation conversation={c} currentUser={currentUser} />
                            </div>

                        ))}

                    </div>
                </div>


                <div className="chatBox bg-gradient-to-r from-lime-200 via-lime-100 to-lime-200 shadow-md shadow-black ">

                    <div className="chatBoxWrapper ">
                        {showEmoji && (
                            <div className='emojiPickerContainer'>
                                <Picker perLine={7} emojiSize={20} emojiButtonSize={28} className='custom-picker-class' data={data} onEmojiSelect={addEmoji} />
                            </div>
                        )}
                        {currentChat ? (<>
                            <div className="chatBoxTop">
                                {messages.map((m) => (
                                    <div key={m?._id} ref={scrollRef}>
                                        <Messages message={m} own={m.sender === currentUser?._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <span onClick={toggleEmojiPicker} style={{ fontSize: '30px', cursor: 'pointer' }} className="emojiIcon"><MdOutlineEmojiEmotions /></span>

                                <input type='text' className='chatMessageInput rounded-full' placeholder='write something..' value={text} onChange={messageHandler} ></input>

                                {showSendButton ?
                                    (
                                        <button className='chatSubmitButton rounded-full ' style={{ fontSize: '30px', cursor: 'pointer', alignItems: 'center', justifyContent: "center", display: 'flex' }} onClick={sendMessage} >
                                            <IoIosSend />

                                        </button>
                                    ) : (null)}

                            </div>
                        </>) : (<span className='noConversation'>Open a conversation to start a chat </span>)
                        }
                    </div>
                </div>


                <div className="chatOnline">
                    <div className="chatOnlineWrapper  rounded-md  bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 shadow-md shadow-black">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={currentUser?._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>

            </div>
            <Footer />
        </>

    )
}

export default Message