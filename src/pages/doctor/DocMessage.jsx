import { useSelector } from 'react-redux'
import DocChatOnline from '../../components/chatOnline/DocChatOnline'
import Conversation from '../../components/doctor/DocConversation'
import Messages from '../../components/doctor/DocMessage'
import Nav from '../../components/doctor/docNav'
import '../user/message/Message.css'
import { useEffect, useRef, useState } from 'react'
import { getConversation, getMessages, send, storeMedia, uploadMedia } from '../../api/conversationApi'

import { io } from "socket.io-client"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { getUsers } from '../../api/userApi'
import addIcon from '../../../public/app.png'
import imgIcon from '../../../public/image.png'
import videoIcon from '../../../public/video.png'
import docsIcon from '../../../public/google-docs.png'

import ReactLoading from 'react-loading'

import noMsg from '../../../public/no-messages.webp'


const DocMessage = () => {

    const docData = useSelector((state) => state.doctor.doctor)
    const [conversation, setConverstion] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [showSendButton, setShowSendButton] = useState(false)
    const [conversationId, setConversationId] = useState('')
    const [usersForChat, setUsersForChat] = useState([])
    const [emoji, setEmoji] = useState(null)
    const [showEmoji, setShowEmoji] = useState(false)
    const [receiverId, setReceiverId] = useState('')

    const [showPopUp, setShowPopUp] = useState(false)
    const [file, setFile] = useState(null)
    const [showSelectedMedia, setShowSelectedMedia] = useState(null)

    const [mediaError, setMediaError] = useState('')

    const [loading, setLoading] = useState(false)


    const currentUser = JSON.parse(docData)



    const socket = useRef()
    //conecting socket
    useEffect(() => {
        socket.current = io(import.meta.env.VITE_WEBSOCKET)

        socket?.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data?.senderId,
                text: data?.text,
                media: data?.media,
                createdAt: Date.now()
            })
        })
    }, [])

    //handle arrival of new message
    useEffect(() => {

        arrivalMessage && currentChat?.members?.includes(arrivalMessage?.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    //get all users for chat from booking
    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getUsers(currentUser?._id)
                setUsersForChat(result)
            } catch (error) {
                console.log(error.message);
            }
        }
        fetch()
    }, [currentUser?._id])


    //add user to socket get online users for chat
    useEffect(() => {
        socket.current.emit('addUser', currentUser?._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(usersForChat?.filter((item) => users?.some((user) => user?.userId === item?._id)))
        })
    }, [text, usersForChat])

    const scrollRef = useRef()

    //get conversation 
    useEffect(() => {
        const fetch = async () => {
            try {
                if (currentUser) {
                    const result = await getConversation(currentUser?._id)
                    // console.log('conversatin--',result);
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


    //get messages, 
    useEffect(() => {
        const Messages = async () => {
            try {
                if (conversationId) {
                    const res = await getMessages(conversationId)
                    setMessages(res)
                }
              
            } catch (error) {
                console.log(error.message);
            }
        }
        Messages()
    }, [conversationId])

    // get id of the currentChat user
    const getCurrentChatId = (c) => {
        const rcvrId = c?.members.find((item) => item !== currentUser?._id)
        setReceiverId(rcvrId)
        setCurrentChat(c)
        setConversationId(c?._id)
    }


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
        setText(text + emojiObject?.native);
        setShowSendButton(true)

    };

    const toggleEmojiPicker = () => {
        setShowEmoji(!showEmoji)

    }

    //send message
    const sendMessage = async (e) => {
        e.preventDefault()

        if (text === '' && emoji === null && file.length < 1) {
            return;
        }

        try {

            //if there is any media selected
            if (file) {
                setLoading(true)

                const formData = new FormData()
                formData.append('medias', file)
                const uploadToMulter = await uploadMedia(formData)

                if(uploadToMulter === undefined){
                    setMediaError('something went wrong!')
                    setLoading(false)
                    setShowSendButton(false)
                    setShowSelectedMedia(null)

                }

                console.log('multer upload result--', uploadToMulter);
                if (uploadToMulter?.data?.error === 'File size exceeds the limit.') {
                    setMediaError('File size exceeds the limit')
                    setLoading(false)
                }
                else if (uploadToMulter?.data?.error === 'No media file found.') {
                    setMediaError('No media file found.')
                    setLoading(false)
                }

                if (typeof uploadToMulter === 'string') {


                    socket.current.emit("sendMessage", {
                        senderId: currentUser?._id,
                        receiverId,
                        media: uploadToMulter,
                    })

                    const result = await storeMedia(conversationId, currentUser._id, uploadToMulter)
                    if (result) {
                        setLoading(false)
                    }
                    setMessages(prevMessages => [...prevMessages, result])
                    setText('')
                    setEmoji(null)
                    setShowEmoji(false)
                    setShowSendButton(false)
                    setShowSelectedMedia(null)
                    setFile(null)
                }
            }

            if (text || emoji) {
                socket.current.emit("sendMessage", {
                    senderId: currentUser?._id,
                    receiverId,
                    text
                })

                const result = await send(conversationId, currentUser?._id, text)
                setMessages(prevMessages => [...prevMessages, result])
                setText('')
                setEmoji(null)
                setShowEmoji(false)
                setShowSendButton(false)
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    //pop up to select the media
    const togglePopUp = () => {
        setShowPopUp(!showPopUp)
        setShowSelectedMedia('')
        setMediaError('')
        setLoading(false)
    }


    const handleFileSelection = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            const mediaLink = URL.createObjectURL(file);

            // Check the file type using the 'type' property
            const fileType = file.type;
            const isImage = fileType.startsWith('image/');
            const isVideo = fileType.startsWith('video/');
            const isDocument = fileType === 'application/pdf' || fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'text/plain';

            setShowSelectedMedia({ url: mediaLink, type: fileType, isImage, isVideo, isDocument });
            setFile(file);
            setShowSendButton(true);
            setShowPopUp(false);
            setMediaError('')
        }
    };


    return (
        <>
            <Nav />
            {usersForChat ? (
                <div className='  flex justify-center'>

                    <div className='messenger  p-10 gap-5 '>

                        <div className="chatMenu ">
                            <div className="chatMenuWrapper rounded-md bg-gradient-to-r from-lime-100 via-lime-50
                             to-lime-100 shadow-md shadow-black overflow-y-scroll 
                             ">
                                <span className='chatlist'>Chat List</span>
                                {/* <input placeholder='search' className='chatMenuInput' /> */}
                                {conversation?.map((c) => (
                                    <div key={c?._id} onClick={() => { getCurrentChatId(c) }}>
                                        <Conversation conversation={c} currentUser={currentUser} />
                                    </div>

                                ))}

                            </div>
                        </div>


                        <div className="chatBox bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black ">
                            <div className="chatBoxWrapper  bg-gradient-to-r from-lime-200 via-lime-50 to-lime-200 p-4  rounded-2xl">
                                {showEmoji &&
                                    <div className='emojiPickerContainer'>
                                        <Picker perLine={7} emojiSize={20} emojiButtonSize={28}
                                            className='custom-picker-class'
                                            data={data} onEmojiSelect={addEmoji} />
                                    </div>
                                }
                                {currentChat ? (<>
                                    <div className="chatBoxTop">

                                        {messages?.map((m) => (
                                            <div key={m?._id} ref={scrollRef}>
                                                <Messages message={m}
                                                    own={m?.sender === currentUser._id} />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="chatBoxBottom">
                                        <span onClick={toggleEmojiPicker}
                                            style={{ fontSize: '30px', cursor: 'pointer' }}
                                            className="emojiIcon">
                                            <MdOutlineEmojiEmotions />
                                        </span>

                                        <div className=''>
                                            <button className='' onClick={togglePopUp}>
                                                <img className='w-8' src={addIcon} alt="" />
                                            </button>
                                            {showPopUp && (
                                                <div className='absolute bottom-20 flex flex-col gap-3 bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 shadow-sm shadow-black p-2 rounded border mt-2 w-40 '>
                                                    <label className="cursor-pointer flex items-center" htmlFor="image-input">
                                                        <img src={imgIcon} alt="Image Icon" className="w-6 h-6 mr-2" />
                                                        Images
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="image-input"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileSelection}
                                                    />
                                                    <label className="cursor-pointer flex items-center" htmlFor="video-input">
                                                        <img src={videoIcon} alt="Video Icon" className="w-6 h-6 mr-2" />
                                                        Videos
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="video-input"
                                                        accept="video/*"
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileSelection}
                                                    />
                                                    <label className="cursor-pointer flex items-center" htmlFor="document-input">
                                                        <img src={docsIcon} alt="Document Icon" className="w-6 h-6 mr-2" />
                                                        Documents
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="document-input"
                                                        accept=".pdf,.doc,.docx,.txt"
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileSelection}
                                                    />
                                                </div>
                                            )}
                                            {showSelectedMedia && (
                                                <div className='absolute bottom-20 p-2'>
                                                    {
                                                        showSelectedMedia.isVideo ? (
                                                            <div className={`relative bg-gradient-to-r from-lime-100 flex h-full items-center
                                                         via-lime-50 to-lime-100 py-2 shadow-sm shadow-black rounded`}>
                                                                {loading ? (
                                                                    <div className='flex justify-center h-full bg-black bg-opacity-50 w-full items-center p-2 absolute '>
                                                                        <ReactLoading type="bars" color="white" height={50} width={25} />
                                                                    </div>
                                                                ) : (null)
                                                                }

                                                                <div className=''>
                                                                    <iframe src={showSelectedMedia?.url} className='overflow-hidden ' />
                                                                </div>
                                                            </div>
                                                        ) : showSelectedMedia.isImage ? (

                                                            <div className='relative bg-gradient-to-r from-lime-100 flex h-full items-center
                                                         via-lime-50 to-lime-100 py-2 shadow-sm shadow-black rounded'>

                                                                {loading ? (
                                                                    <div className='flex justify-center h-full bg-black bg-opacity-50 w-full items-center p-2 absolute '>
                                                                        <ReactLoading type="bars" color="white" height={50} width={25} />
                                                                    </div>
                                                                ) : (null)
                                                                }
                                                                <img src={showSelectedMedia?.url} alt="" />
                                                            </div>
                                                        ) : showSelectedMedia.isDocument ? (
                                                            <div className='relative bg-gradient-to-r from-lime-100 flex h-full items-center
                                                        via-lime-50 to-lime-100 shadow-sm shadow-black rounded'>
                                                                {loading ? (
                                                                    <div className='flex justify-center h-full bg-black bg-opacity-50 w-full items-center p-2 absolute '>
                                                                        <ReactLoading type="bars" color="white" height={50} width={25} />
                                                                    </div>
                                                                ) : (null)
                                                                }
                                                                <span className='p-5'>  {showSelectedMedia.url.split('/').pop()}</span>
                                                            </div>
                                                        ) : (null)

                                                    }
                                                    {mediaError ?
                                                        (
                                                            <div className='bg-red-100 mt-2 p-3 shadow-sm shadow-black rounded'>
                                                                {mediaError}
                                                            </div>
                                                        ) : null
                                                    }

                                                </div>
                                            )
                                            }
                                        </div>

                                        <input type='text'
                                            className='chatMessageInput rounded-md'
                                            placeholder='write something..' value={text}
                                            onChange={messageHandler} ></input>

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
            ) : (
                <>
                    <div className='flex flex-col items-center justify-center h-[621px]'>
                        <p className='mt-5 text-blue-gray-600 text-xl font-bold'>Messages will be available only after getting booking</p>
                        <img src={noMsg} alt="" />
                    </div>
                </>
            )}

        </>

    )
}

export default DocMessage