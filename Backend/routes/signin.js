import e from "express";
import User from "../models/User.js";

const router = e.Router();
router.post('/signin', async (req, res) => {
    try{
      const {email, password} = req.body;
      console.log("Received signin request:", { email, password });
      
      const user=await User.findOne({email});
      console.log("Found user:", user);
      // Check if user exists and password matches
      if(user.length === 0 || user.password !== password){
         return res.status(400).json({ message: "Invalid email or password" });
      }
      res.json({ message: "User signed in successfully", user });
    }catch(err){
       console.error(err);
       res.status(500).json({ message: "Internal server error" });
    }         
});    

export default router;

