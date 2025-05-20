import jwt from "jsonwebtoken";
 export const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.SECURE_KEY);
    return token;
 }