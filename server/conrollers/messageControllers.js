import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.js";
import User from "../models/User.js";
import {io,userSocketMap} from "../server.js";
import mongoose from "mongoose";
//controller for chaList
export const chatList=async(req,res)=>{
    try{
        const userId=req.user._id;
        const filteredUser=await User.find({_id:{$ne:userId}}).select("-password");
        
        //count unseen messages
         const unseenMessages={};
         const promises=filteredUser.map(async(user)=>{
            const messages=await Message.find({senderId:user._id,recieverId:userId,seen:false});
            if(messages.length>0){
                unseenMessages[user._id]=messages;
            }
         })
         await Promise.all(promises);
         res.json({success:true,users:filteredUser,unseenMessages});

    } catch(error){
        console.log("error in chatList controller",error.messages);
        res.json({success:false,message:error.message});
    }
}


//get messages for selected users
export const getMessages=async(req,res)=>{
    try{
        const {id:friendId}=req.params;
        const myId=req.user._id;
        const chats=await Message.find({
            $or:[
                {senderId:myId,recieverId:friendId},
                {senderId:friendId,recieverId:myId}
            ]
        })
        await Message.updateMany({senderId:myId,recieverId:friendId},
        {seen:true});
        res.json({success:true,data:chats});
    } catch(error){
        console.log("error in getmessage controller",error.messages);
        res.json({success:false,message:error.message});
    }
}

//mark message as seen using messageId;

export const markSeen=async(req,res)=>{
    try{
        const {messageId}=req.params;
        await Message.findByIdAndUpdate(messageId,{seen:true});
        res.json({success:true});
    } catch(error){
        console.log("error in markSeen controller",error.messages);
        res.json({success:false,message:error.message});
    }

}

//controller to send message


export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    // Validate receiverId presence
    if (!receiverId) {
      return res.status(400).json({ success: false, message: "Receiver ID is required" });
    }

    // Validate receiverId format
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ success: false, message: "Invalid receiver ID" });
    }

    let imageUrl;
    if (image) {
      const response = await cloudinary.uploader.upload(image);
      imageUrl = response.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId, // Corrected spelling
      text,
      image: imageUrl
    });

    // Emit to receiver socket if online
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ success: true, newMessage });
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
