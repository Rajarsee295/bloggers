import express, { Router } from "express";
import User from "../models/User.js";

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { id , username, email, password } = req.body;
        console.log("Received signup request:", { id , username, email, password });
        
        const coexsting = await User.findOne({ username })
        const coexstingEmail = await User.find({ email });
        if (coexsting && coexstingEmail) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const user = new User({ id , email , username, password });
        await user.save();

        res.json({ message: "User created" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;