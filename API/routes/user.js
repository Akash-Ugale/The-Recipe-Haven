import express from "express";
import bcrypt from "bcryptjs";
import { register ,login, profile} from "../controllers/user.js";
import { Authenticate } from "../middlewares/auth.js";
import cors from 'cors';


const router = express.Router();


// POST /api/register -> Calls RegisterUser()
// User Registration Route
router.post("/register",register);

// user login
router.post("/login",login);

export default router;

// profile

router.get('/user', Authenticate,profile)


router.use(cors({ origin: "http://localhost:5173", credentials: true }));


/* import express from 'express';
import { User } from "../models/user.js"; // ✅ Corrected



const router = express.Router();

router.post("/register",async(req,res)=>{
    const {name, gmail,password} = req.body

    try {
        let user = await User.findOne({gmail})
        
        if(user) return res.json({message:"User Already exist"});
        
        user = await User.create({name,gmail, password})
        res.json({message:"User Register Successfully..!",user})
    }catch (error){
        res.status(500).json({ message: "Server Error", error: error.message });
    }
    
})

export default router;

 */