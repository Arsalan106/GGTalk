import React, { useContext, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import RightSideBar from '../components/RightSideBar'
import Sidebar from '../components/Sidebar'
import { ChatContext } from '../../context/chatContext'
const HomePage = () => {
    const {selectedUsers}=useContext(ChatContext)

    return (
        <div className="border w-full h-screen sm:px-[10%] sm:py-[4%] text-white">
            {selectedUsers ? <div className="grid grid-cols-3 backdrop-blur-xl border-2 border-gray-600 rounded-2xl
            overflow-hidden h-[100%] relative">
                <Sidebar/>
                <ChatContainer />
                <RightSideBar  />    
            </div> : <div className="grid grid-cols-2 backdrop-blur-xl border-2 border-gray-600 rounded-2xl
            overflow-hidden h-[100%] relative">
                <Sidebar  />
                <ChatContainer  />
            </div>}
        </div>
    )
}

export default HomePage
