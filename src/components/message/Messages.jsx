import './messages.css'
import propTypes from 'prop-types'
import {format} from 'timeago.js'

const Messages = ({message,own}) => {
    return (
        <>
            <div className={own ? 'message own': 'message'}>
                <div className="messageTop">
                    {/* <img className='messageImg' src="" alt="" /> */}
                    <p className='messageText'>{message?.text}</p>
                </div>
                <div className="messageBottom">
                    {format(message?.createdAt)}
                </div>
            </div>
        </>
    )
}

export default Messages
Messages.propTypes ={
    own:propTypes.func.isRequired,
    message:propTypes.func.isRequired
}