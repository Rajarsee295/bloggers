import express, { Router } from "express";
import User from "../models/User";

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const coexsting = await User.findOne({ username })
        if (coexsting) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const user = new User({ username, password });
        await user.save();

        res.json({ message: "User created" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;