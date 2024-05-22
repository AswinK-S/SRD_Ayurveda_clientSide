import { useEffect, useState } from 'react'
import './DocConversation.css'
import propTypes from 'prop-types'
import { getUserData } from '../../api/conversationApi'


const DocConversation = ({ conversation, currentUser }) => {

  const [messenger, setMessenger] = useState(null)
  useEffect(() => {
    const messengerId = conversation?.members.find((m) => m !== currentUser?._id)
    // console.log('msngr Id -->', messengerId);
    const getMessenger = async () => {
      try {
        const result = await getUserData(messengerId)
        // console.log('msngr dtls-->', result);
        setMessenger(result)
      } catch (error) {
        console.log(error.message);
      }
    }

    getMessenger()
  }, [])


  return (
    <>
      <div className='conversation'>
        {messenger?.image ?(
          <img className='conversationImg' src={messenger?.image} alt="" />
        ):(
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"></path></svg>
        </div>
      )}

        <span className="conversationName "> {messenger?.name} </span>
      </div>
    </>
  )
}

DocConversation.propTypes = {
  conversation: propTypes.func.isRequired,
  currentUser: propTypes.func.isRequired
}

export default DocConversation