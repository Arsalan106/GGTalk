import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { chatList, getMessages, markSeen, sendMessage } from "../conrollers/messageControllers.js";
const messageRouter=express.Router();

messageRouter.get("/users",protectRoute,chatList);
messageRouter.get("/:id",protectRoute,getMessages);
messageRouter.put("/mark/:id",protectRoute,markSeen);
messageRouter.post("/send/:id",protectRoute,sendMessage);
export default messageRouter;