const User = require('../model/user');

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
        const user = new User({
            name,
            email,
            password
        })
        await user.save();
        return res.status(201).json({message: "User successfully Created", user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Something went Wrong", err});
    }
}