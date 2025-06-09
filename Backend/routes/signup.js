import express, { Router } from "express";
import User from "../models/User";

const router=express.Router();

router.post('/signup',async(req,res) => {
    const { username , email , password } = req.body;

    const coexsting = await User.findOne({username})
    if(coexsting){
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({ username, password }); 
    await user.save();

   cdres.json({ message: "User created" });
});