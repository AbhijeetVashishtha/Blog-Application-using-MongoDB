const express = require('express');

const router = express.Router();

const blogController = require('../controller/blog-controller'); 

router.get("/", blogController.getAllBlogs);

router.post("/addBlog", blogController.postBlog);

router.put("/updateBlog/:id", blogController.updateBlog);

module.exports = router;
