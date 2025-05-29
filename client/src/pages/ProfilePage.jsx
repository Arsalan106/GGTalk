import React, { useContext, useState } from 'react'
import assets from '../assets/assets';
import { useNavigate } from "react-router";
import { Authcontext } from '../../context/storeContext';
const ProfilePage = () => {
  const {updateProfile,authUser}=useContext(Authcontext);
  const [selectedImg,setSelectedImg]=useState(false);
  const [name,setName]=useState(authUser.fullName);
  const [bio,setBio]=useState(authUser.bio);
  const navigate=useNavigate();
  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName:name,bio});
      navigate('/');
      return;
    }
    //convert the image to base 64-image
    const reader=new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload=async()=>{
      const base64Image=reader.result;
      await(updateProfile({profoilePic:base64Image,fullName:name,bio}));
      navigate('/');
    }
  }
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-around text-white '>
      <div className=' max-w-5/6 w-2xl backdrop-blur-2xl border-2 border-gray-600 flex items-center justify-between  rounded-lg'>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile details</h3 >
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>{setSelectedImg(e.target.files[0])}} type="file" id='avatar' accept='.png, .jpg' hidden />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
            <p>Upload profile</p>
          </label>
          <input type="text" onChange={(e)=>setName(e.target.value)} value={name}  placeholder='Name' className='p-2 focus:outline-none border-2 border-gray-500 rounded-md'/>
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} name="" rows={4} id="" placeholder='Write something about you....' className='p-2 focus:outline-none border-2 border-gray-500 rounded-md'>
          </textarea> 
          <button type="submit" className='p-2 bg-gradient-to-r from-purple-400 to-violet-600 cursor-pointer'>Save</button>
        </form>
        <img src={authUser?.profilePic || assets.logo_icon} alt="" className={`max-w-25 aspect-square  mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} />
      </div>
    </div>
  )
}

export default ProfilePage
