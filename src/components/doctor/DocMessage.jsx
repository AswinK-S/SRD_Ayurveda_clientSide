import './DocMessage.css'
import propTypes from 'prop-types'
import { format } from 'timeago.js'
import dwnld from '../../../public/download.png'

const DocMessage = ({ message, own }) => {

    // console.log('msg in docmsg --',message);
    const getMediaComponent = () => {
        
        if (!message?.media) return null;
        // Check the media type using file extension or MIME type
        const fileExtension = message.media.split('.').pop().toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileExtension);
        const isVideo = ['mp4', 'mov', 'avi', 'mkv'].includes(fileExtension);
        const isDocument = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip'].includes(fileExtension);

        if (isImage) {
            // Render image component
            return <div className={own ? 'messageMedia own rounded-md ' : 'messageMedia rounded-md'}>
                         <img src={message?.media} alt="Media" className='rounded-md' />
                   </div>;
        } else if (isVideo) {
            // Render video component
            return (
                <video controls className={own ? 'messageMedia own rounded-md ' : 'messageMedia rounded-md'}>
                    <source src={message?.media} type={`video/${fileExtension}`} className='rounded' />
                </video>
            );
        } else if (isDocument) {
            // Render document component
            return (
                <a href={message?.media} target="_blank" rel="noopener noreferrer" className={own ?
                    "messageMedia own flex items-center  p-3 rounded shadow-sm shadow-black" :
                    "messageMedia flex items-center   shadow-sm shadow-black rounded-md"}>
                    <span className='p-2'>{message?.media.split('/').pop()}</span>
                    <img className="w-10" src={dwnld} alt="" />
                </a>
            );
        } else {
            // Render default component for unsupported media types
            return <p>{message?.media}</p>;
        }
    };

    return (
        <>
            <div className={own ? 'message own' : 'message'}>
                <div className="messageTop">
                    {message?.text && <p className='messageText'>{message?.text}</p>}
                    {getMediaComponent()}
                </div>
                <div className="messageBottom">
                    {format(message?.createdAt)}
                </div>
            </div>
        </>
    )
}

export default DocMessage
DocMessage.propTypes = {
    own: propTypes.func.isRequired,
    message: propTypes.func.isRequired
}