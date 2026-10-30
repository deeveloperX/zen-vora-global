const express = require('express');
const BlogPost = require('../models/BlogPost');
const {verifyAdmin} = require('../middleware/auth');

const router = express.Router();

// 1. PUBLIC: Get all public Blog Posts
router.get('/', async(req, res) =>{
  try {
    const posts = await BlogPost.find({}).sort({ createdAt: -1});
    res.json(posts);
  } catch(error){
    res.status(500).json({message: 'Failed to fetch Blog Post', error: error.message});
  }
});

// 2. PUBLIC: Get single blog post by slug
router.get('/:slug', async(req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug});
    if(!post) {
      return res.status(404).json({ message: 'Blog post not found'});
    }
    res.json(post);
  } catch(error){
    res.status(505).json({ message: 'Failed to fetch blog post', error: error.message});
  }
});

// 3. ADMIN: Create a blog post
router.post('/', verifyAdmin, async(req , res) => {
  try {
    const newPost = new BlogPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch(error){
    res.status(404).json({ message: 'Failed to create blog post', error: error.message});
  }
});

// 4. ADMIN: Update a blog post
router.patch('/:id', verifyAdmin, async(req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidator: true}
    );
    if(!updatedPost){
      return res.status(404).json({ message: 'Blog post not found'});
    } 
    res.json(updatedPost);
  } catch(error){
    res.status(404).json({ message: 'Failed to Update Blog Post', error: error.message});
  }
});

// 5. ADMIN: Delete the blog post
router.delete('/:id', verifyAdmin, async(req, res) => {
  try{
  const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);

  if(!deletedPost) {
    res.status(404).json({ messsage: 'Blog post not found'});
  }
  res.json({ message: 'Blog post deleted successfully'});
} catch(error){
  res.status(505).json({ message: 'Failed to delete the Blog Post', error: error.message});
}
});

module.exports = router;