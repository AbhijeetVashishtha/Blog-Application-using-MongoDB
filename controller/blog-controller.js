const Blog = require('../model/blog');  

exports.getAllBlogs = async(req,res) => {
    try{
        let blogs = await Blog.find();
        if(!blogs)
        {
            return res.status(404).json({message: "No Blog found"});
        }
        return res.status(200).json({blogs});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}

exports.postBlog = async (req,res) => {
    try{
        const {title, description, image, user} = req.body;
        const blog = new Blog({
            title,
            description,
            image,
            user
        });
        await blog.save();
        return res.status(200).json({blog}); 
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({message: "Something went Wrong"});
    }
}