import './DocMessage.css'
import propTypes from 'prop-types'
import {format} from 'timeago.js'

const DocMessage = ({message,own}) => {
    return (
        <>
            <div className={own ? 'message own': 'message'}>
                <div className="messageTop">
                    {/* <img className='messageImg' src="" alt="" /> */}
                    <p className='messageText'>{message.text}</p>
                </div>
                <div className="messageBottom">
                    {format(message.createdAt)}
                </div>
            </div>
        </>
    )
}

export default DocMessage
DocMessage.propTypes ={
    own:propTypes.func.isRequired,
    message:propTypes.func.isRequired
}