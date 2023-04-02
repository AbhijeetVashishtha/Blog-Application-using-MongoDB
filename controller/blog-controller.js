const Blog = require('../model/blog');
const User = require('../model/user'); 
const mongoose = require('mongoose'); 

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
        let existingUser = await User.findById(user);
        if(!existingUser)
        {
            return res.status(400).json({message: "User not Found by this ID"});
        }
        const blog = new Blog({
            title,
            description,
            image,
            user
        });
        const Session = await mongoose.startSession();
        Session.startTransaction();
        await blog.save({Session});
        existingUser.blogs.push(blog);
        await existingUser.save({Session});
        await Session.commitTransaction();
        return res.status(200).json({blog}); 
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({message: "Something went Wrong"});
    }
}

exports.updateBlog = async(req,res) => {
    try{
        const {title, description} = req.body;
        const blogId = req.params.id;
        const blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
        if(!blog)
        {
            return res.status(400).json({message: "Blog Not found and Unable to update"})
        }
        return res.status(200).json({blog});
    }
    catch(err) 
    {
        console.log(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}

exports.getBlogById = async(req,res) => {
    try{
        const blogId = req.params.id;
        let blog = await Blog.findById(blogId);
        if(!blog)
        {
            return res.status(404).json({message: "Blog Not found"});
        }
        return res.status(200).json({blog});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}

exports.deleteBlogById = async (req,res) => {
    try{
        const BlogId  = req.params.id;
        let blog = await Blog.findByIdAndRemove(BlogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        if(!blog)
        {
            return res.status(404).json({message: "No Blog Found with this ID"});
        }
        return res.status(200).json({message: "Blog Successfully Deleted"});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}

exports.getUserBlog = async (req,res) => {
    try{
        const userId = req.params.id;
        let userBlogs = await User.findById(userId).populate('blogs');
        if(!userBlogs)
        {
            return res.status(404).json({message: "No Blog Found with this userId"});
        }
        return res.status(200).json({blogs: userBlogs});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message: "Something went wrong"});
    }
}