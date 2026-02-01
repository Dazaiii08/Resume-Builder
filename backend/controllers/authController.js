const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

//generate a JWT token
const generateToken =(userId) =>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn:"7d"});
}

//@desc Register a new user
//@route POST/api/auth/register
//@access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error); // 👈 ADD THIS
    res.status(500).json({ message: "Server Error" });
  }
};


//@desc Login user
//@route POST/api/auth/login
//@acccess Public
const loginUser = async(req,res)=>{
    try{

        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Email or Password"});
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Email or Password"});
        }

        //return user data with JWT 
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token: generateToken(user._id)
        });

    } catch(err){
         res.status(500).json({message:"Server Error", error:err.message})
    }
}

//@desc get user profile
//@route POST/api/auth/profile
//@acccess Private(Requires JWT)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};


module.exports = {registerUser,loginUser,getUserProfile}