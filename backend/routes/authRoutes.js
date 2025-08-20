import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//register
router.post("/register", async(req, res)=>{
    try{
        const{name, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "EmailID already exists. Please login."});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({name, email, password: hashedPassword});
        await user.save();

        res.status(201).json({message: `User registered successfully. Welcome ${name}!`});
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
})

//login
router.post("/login", async(req,res)=>{
    try{
        const{email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "48h"});

        res.json({message:"Welcome back!",token, user:{id: user._id, name: user.name, email: user.email}
        })
    }catch(err){
            res.status(500).json({message: "Server error", error: err.message});
        }
})

export default router;