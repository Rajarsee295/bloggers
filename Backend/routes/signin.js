import e from "express";
import User from "../models/User";

const router = e.Router();
router.post('/signin', async (req, res) => {
    try{
      const {email, password} = req.body;
      const user=await User.find({email});
      if(!user || user.password !== password){
         return res.status(400).json({ message: "Invalid email or password" });
      }
      res.json({ message: "User signed in successfully", user });
    }catch(err){
       console.error(err);
       res.status(500).json({ message: "Internal server error" });
    }         
});    

export default router;