import express, { Router } from "express";
import User from "../models/User.js";

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { id , username, email, password } = req.body;
        
        
        //checking if email and username are already present in the database
        const coexsting = await User.findOne({ username })
        const coexstingEmail = await User.find({ email });
        if (coexsting && coexstingEmail) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        //creating new user
        const user = new User({ id , email , username, password });
        await user.save();
         
        //user created successfully
        res.json({ message: "User created" });

    } catch (err) {
        //sending back error if any
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;