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
    }
}
