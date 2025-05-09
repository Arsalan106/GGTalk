import React, { useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import RightSideBar from '../components/RightSideBar'
import Sidebar from '../components/Sidebar'
const HomePage = () => {
    const [selectedUsers, setSelectedUsers] = useState(false);

    return (
        <div className="border w-full h-screen sm:px-[15%] sm:py-[5%] text-white">
            {selectedUsers ? <div className="grid grid-cols-3 backdrop-blur-xl border-2 border-gray-600 rounded-2xl
            overflow-hidden h-[100%] relative">
                <Sidebar selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
                <ChatContainer selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                <RightSideBar selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />    
            </div> : <div className="grid grid-cols-2 backdrop-blur-xl border-2 border-gray-600 rounded-2xl
            overflow-hidden h-[100%] relative">
                <Sidebar selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                <ChatContainer selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            </div>}
        </div>
    )
}

export default HomePage
