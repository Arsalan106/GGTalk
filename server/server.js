import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routers/userRoutes.js";
import messageRouter from "./routers/messageRoutes.js";
import {Server} from 'socket.io'




//express app sercer
const app=express();
const server=http.createServer(app);

//created a circuit of sockets 

export const io=new Server(server,{
    cors:{origin:"*"}
})

export const userSocketMap={};


//listener on the server side
io.on("connection",(socket)=>{
  const userId=socket.handshake.query.userId;
  console.log("User Connected",userId);
  if(userId) userSocketMap[userId]=socket.id;

  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  socket.on("disconnect",()=>{
    console.log("User disconnected",userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  })
})

//middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());

//route setup
app.use("/api/status",(req,res)=>res.send("server is live"));
app.use('/api/auth',userRouter);
app.use("/api/messages",messageRouter)

await connectDB();
if( process.env.NODE_ENV!=="production"){
  const PORT=process.env.PORT || 5001;
  server.listen(PORT,()=>console.log("server is running on PORT",PORT));
}

//export server for vercel
export default server;