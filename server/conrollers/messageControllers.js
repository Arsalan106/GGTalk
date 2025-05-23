import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.js";
import User from "../models/User.js";
import {io,userSocketMap} from "../server.js";
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


export const sendMessage=async(req,res)=>{
    try{
        const {text,image}=req.body;
        //id who is logged in
        const senderId=req.user._id;
        const recieverId=req.params.id;
        let imageUrl;
        if(image){
            const response=await cloudinary.uploader.upload(image);
            imageUrl=response.secure_url;
        }
        const newMessage=await Message.create({
            senderId,
            recieverId,
            text,
            image:imageUrl
        })
        const recieverSocketId=userSocketMap[recieverId];
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage);
        }
        res.json({success:true,newMessage});
    }catch(error){
        console.log("error in send messages controller",error.messages);
        res.json({success:false,message:error.message});
    }
}