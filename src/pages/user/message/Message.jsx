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
                            <Messages own={true}/>
                            <Messages own={true}/>
                            <Messages own={true}/>
                            <Messages own={true}/>
                        </div>
                        <div className="chatBoxBottom">

                        </div>
                    </div>
                </div>


                <div className="chatOnline">
                    <div className="chatOnlineWrapper">Online</div>
                </div>

            </div>
        </>

    )
}

export default Message