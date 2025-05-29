    import React, { useContext, useEffect, useState } from 'react'
    import assets from '../assets/assets'
    import { useNavigate } from 'react-router-dom'
    import { Authcontext } from '../../context/storeContext'
    import { ChatContext } from '../../context/chatContext'
    const Sidebar = () => {
        const {getUsers,users,selectedUsers,setSelectedUsers,setUsers}=useContext(ChatContext);
        const {unseenMessage,setUnseenMessage}=useContext(ChatContext);
        const [input,setInput]=useState(false);

        const {logout,onlineUser}=useContext(Authcontext);
        const navigate = useNavigate();
        const filteredUsers=input ? users.filter((user)=>user.fullName.toLowerCase()
        .includes(input.toLowerCase())) : users;

        useEffect(()=>{
            getUsers();
        },[onlineUser])

        return (
            <div className={`bg-[#818582]/10 h-full p-5 rounded-r-xl  text-white ${selectedUsers ? "max-md:hidden" : ""}`}>
                <div>
                    <div className="flex justify-between items-center">
                        <img src={assets.logo_icon} alt="logo" className='max-w-10 ml-2'></img>
                        <p className='absolute left-20'>GGTalk</p>
                        <div className="relative py-2 group">
                            <img src={assets.menu_icon} className='max-h-5 cursor-pointer'></img>
                            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md
        bg-[#282142] border border-gray-600 text-gray-100 hidden  group-hover:block'>
                                <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
                                <hr className='my-2 border-t border-gray-500' />
                                <p onClick={()=>{logout()}} className='cursor-pointer text-sm'>Logout</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
                        <img src={assets.search_icon} alt="" className='w-3' />
                        <input onChange={(e)=>setInput(e.target.value)} type="text"  placeholder="Search User" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1'></input>
                    </div>
                </div>
                {/* display users */}
                <div className='flex flex-col mt-4'>
                    {filteredUsers.map((user, index) => (
                        <div onClick={() => { setSelectedUsers(user) }} key={index} className={`relative flex items-center overflow-y-scroll gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm
                        ${selectedUsers?._id === user._id && 'bg-[#282142]'}`}>
                            <img src={user?.profilePic || assets.avatar_icon} alt=""
                                className='w-[35px] aspect-[1/1] rounded-full' />
                            <div className='flex flex-col leading-5'>
                                <p>{user.fullName}</p>
                                {
                                    onlineUser.includes(user._id)   
                                        ? <span className='text-green-400 text-xs'>online</span>
                                        : <span className='text-neutral-400 text-xs'>offline</span>
                                }
                            </div>
                            {
                               unseenMessage && unseenMessage[user._id]>0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full lg violet'>
                                    {unseenMessage[user._id]}
                                </p>
                            }
                        </div>

                    ))}

                </div>
            </div>
        )
    }

    export default Sidebar
