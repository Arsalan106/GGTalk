import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import jwt from "jsonwebtoken"
import cloudinary from "../lib/cloudinary.js";
//signup a new user

export const signup = async (req, res) => {

    try {
        const { fullName, email, password, bio } = req.body;
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing details" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            fullName, email, password:hashedPassword ,bio
        });
        const token = generateToken(newUser._id);
        res.json({ success: true, userData: newUser, token: token, message: "Account created succesfully" });

    } catch (error) {
        console.log("errorn in signup", error.message);
        res.json({ success: false, message: error.message });
    }
}

//controller for login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "user not found"
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.json({
                success: false,
                message: "invalid credentials"
            })
        }
        const token = generateToken(user._id);
        res.json({
            success: true,
            userData: user,
            token: token,
            message: "Login successfully"
        })
    } catch (error) {
        console.log("error in login controller");
        res.json({
            success: false,
            message: error.message
        })
    }
}

//conoller to update profile

export const updateProfile = async (req, res) => {
    try {
        const { fullName, profilePic, bio } = req.body;
        const userId = req.user._id;
        let updatedUser;
        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, {
                fullName,
                bio
            }, {
                new: true
            });
        }
        else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, {
                fullName,
                profilePic: upload.secure_url,
                bio
            }, {
                new: true
            });
        }
        res.json({success:true,user:updatedUser});
    } catch (error) {
        console.log("error in updaet profle controller",error.message);
        res.json({success:false,message:error.meassage});
    }
}   