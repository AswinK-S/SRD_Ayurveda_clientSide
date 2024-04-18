import './messages.css'
import propTypes from 'prop-types'

const Messages = ({own}) => {
    return (
        <>
            <div className={own ? 'message own': 'message'}>
                <div className="messageTop">
                    <img className='messageImg' src="/3.jpg" alt="" />
                    <p className='messageText'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="messageBottom">
                    1 hour ago
                </div>
            </div>
        </>
    )
}

export default Messages
Messages.propTypes ={
    own:propTypes.func.isRequired
}