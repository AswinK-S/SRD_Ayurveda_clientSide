import ChatOnline from '../../../components/chatOnline/ChatOnline'
import Conversation from '../../../components/conversations/Conversation'
import Messages from '../../../components/message/Messages'
import Nav from '../../../components/navbar/nav'
import './Message.css'

const Message = () => {
    return (
        <>
            <Nav />
            <div className='messenger '>

                <div className="chatMenu ">
                    <div className="chatMenuWrapper">
                        <input placeholder='search' className='chatMenuInput' />
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
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
                            <textarea className='chatMessageInput'  placeholder='write something..'></textarea>
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
        </>

    )
}

export default Message