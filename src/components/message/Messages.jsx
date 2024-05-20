import './messages.css'
import propTypes from 'prop-types'
import { format } from 'timeago.js'

const Messages = ({ message, own }) => {
  console.log('message --->', message);

  const getMediaComponent = () => {
    if (!message?.media) return null;

    // Check the media type using file extension or MIME type
    const fileExtension = message.media.split('.').pop().toLowerCase();
    const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileExtension);
    const isVideo = ['mp4', 'mov', 'avi', 'mkv'].includes(fileExtension);
    const isDocument = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension);

    if (isImage) {
      // Render image component
      return <img  src={message.media} alt="Media" className="messageMedia " />;
    } else if (isVideo) {
      // Render video component
      return (
        <video controls className="messageMedia">
          <source src={message.media} type={`video/${fileExtension}`} />
        </video>
      );
    } else if (isDocument) {
      // Render document component
      return (
        <a href={message.media} target="_blank" rel="noopener noreferrer" className="messageMedia">
          <span>{message.media.split('/').pop()}</span>
        </a>
      );
    } else {
      // Render default component for unsupported media types
      return <p>{message.media}</p>;
    }
  };

  return (
    <>
      <div className={own ? 'message own' : 'message'}>
        <div className="messageTop">
          {/* <img className='messageImg' src="" alt="" /> */}
          {message?.text && <p className='messageText'>{message?.text}</p>}
          {getMediaComponent()}
        </div>
        <div className="messageBottom">{format(message?.createdAt)}</div>
      </div>
    </>
  )
}

export default Messages

Messages.propTypes = {
  own: propTypes.bool.isRequired,
  message: propTypes.object.isRequired
}