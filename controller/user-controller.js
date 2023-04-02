const User = require('../model/user');
const bcrypt = require('bcryptjs');

exports.getAllUser = async (req,res) => {
    try{
        let users = await User.find();
        if(!users)
        {
            return res.status(404).json({message: "No Users Found"});
        }
        return res.status(200).json({ users });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Something went Wrong", err});
    }
}

exports.signUp = async (req,res) => {
    try{
        const {name, email, password} = req.body;
        let existingUser = await User.findOne({ email });
        if(existingUser)
        {
            return res.status(400).json({message:"User already Exist! Login Instead"});
        }
        const hashedPassword = bcrypt.hashSync(password);
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save();
        return res.status(201).json({message: "User successfully Created", user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Something went Wrong", err});
    }
}

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;
        // console.log(email);
        // console.log(password);
        let existingUser = await User.findOne({ email });
        if(!existingUser)
        {
            return res.status(404).json({message: "Couldn't find user by this email"})
        }
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if(!isPasswordCorrect)
        {
            return res.status(404).json({message: "Incorrect Password"});
        }
        return res.status(200).json({message: "Login Successful"}); 
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message: "Something went wrong", err});
    } 
}