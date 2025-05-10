import React, { useEffect, useRef } from 'react'
import assets, { userDummyData, messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';
const ChatContainer = ({ selectedUsers, setSelectedUsers }) => {

  const scrollEnd = useRef();
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [])
  return selectedUsers ? (
    <div className=' h-full text-white  overflow-scroll relative backdrop-blur-lg' >
      {/* header of container */}
      <div className='flex justify-around items-center py-4 px-4 mr-3'>
        <img onClick={() => { setSelectedUsers(null) }} src={assets.arrow_icon} className=' max-w-5 cursor-pointer' ></img>
        <img src={assets.profile_martin} alt="" className='w-7 rounded-full '></img>
        <p className='flex-1 text-md text-white flex items-center gap-2 ml-2'>Arsalan Ahmed
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <img src={assets.help_icon} className='max-w-5  max-md:hidden'></img>
      </div>
      <hr className='text-gray-400' />
      {/* chat details */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messagesDummyData.map((msg, index) => (
          // message container
          //the core loginc is if senderId is not equal to the logged in userId then shift the container to left 
          <div key={index} className={`flex items-end justify-end gap-2 ${msg.senderId != '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
            {msg.image ? (
              <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              //if senderId==loggedIn user Id then message container is pointing towards the user else it will point toward the other user
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'
                }`}>{msg.text}</p>
            )}
            <div className='text-center text-xs'>
              <img src={msg.senderId == '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" className='w-7 rounded-full' />
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {/* bottom area */}
      <div className='absolute  bottom-0 left-0 right-0 flex items-center  gap-3 p-3'>
        <div className='flex-1 flex p-1 items-center bg-gray-100/12 rounded-full  justify-center'>
          <input type='text' placeholder='Send a message' className=' flex-1 p-2  border-none outline-none placeholder-gray-400 text-sm text-white'></input>
          <input type='file' id='media' accept='image/png,image/jpg' className='hidden'></input>
          <label htmlFor='media'>
            <img src={assets.gallery_icon} className='w-5 mr-2 cursor-pointer' alt="" />
          </label>
        </div>
        <img src={assets.send_button} className='w-7 cursor-pointer' alt="" />
      </div>
    </div>
  ) : (
    <div className='h-full  overflow-scroll realative backdrop-blur-lg flex flex-col justify-center items-center'>
      <img src={assets.logo_icon} className='max-w-16'></img>
      <p className='text-lg font-md'>Chat Anyitme,Anywhere</p>
    </div>
  )
}

export default ChatContainer
