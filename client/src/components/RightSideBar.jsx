import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/chatContext'
import { Authcontext } from '../../context/storeContext';

const RightSideBar = () => {
  const [images,setImages]=useState([]);
  const {selectedUsers,messages}=useContext(ChatContext);
  const {logout,onlineUser}=useContext(Authcontext);

  useEffect(()=>{
    setImages(
      messages.filter((msg)=>msg.image).map(msg=>msg.image)
    )
  },[])
  return selectedUsers && (
    <div className='h-full bg-gray-100/8 flex flex-col items-center p-4'>
      <div className='flex flex-col items-center gap-2 text-xs font-light'>
        <img 
          src={selectedUsers?.profilePic || assets.avatar_icon} 
          className='rounded-full w-20 aspect-[1/1] mt-6' 
          alt="Profile"
        />
        <h1 className='flex items-center'>
         {onlineUser && onlineUser.includes(selectedUsers._id)  && <span className='w-2 h-2 rounded-full bg-green-600 mr-2'></span>}
          {selectedUsers.fullName}
        </h1>
        <p className='px-10 text-center'>{selectedUsers.bio}</p>
      </div>

      {/* Replaced <hr> with a visible line */}
      <div className="w-[80%] h-[1px] bg-[#ffffff50] my-4 rounded-full" />

      <div className='text-xs px-5'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
              {images.map((url,index)=>(
                <div key={index} onClick={()=>window.open(url)} className='cursor-pointer rounded'>
                  <img src={url} alt=""  className='h-full rounded-md'/>
                </div>
              ))}
        </div>
      </div>
        <button onClick={()=>logout()} className=' flex justify-center  absolute bottom-0 mb-3 bg-blue-600 w-[150px] rounded-2xl p-1 cursor-pointer  hover:scale-105 transition duration-300 ease-in-out'>Logout</button>
    </div>
  )
}

export default RightSideBar
