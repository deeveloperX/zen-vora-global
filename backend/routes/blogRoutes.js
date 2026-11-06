const express = require('express');
const BlogPost = require('../models/BlogPost');
const {verifyAdmin} = require('../middleware/auth');

const router = express.Router();

// 1. ADMIN: Get ALL blog posts (published and drafts)
router.get('/admin/all',verifyAdmin, async (req, res) => {
  try{
    const posts = await BlogPost.find({}).sort({createdAt: -1});
    return res.json(posts);
  } catch(error){
    return res.status(500).json({message: 'Failed to fetch admin blogs', error: error.message});
  }
});

// 2. PUBLIC: Get all public Blog Posts
router.get('/', async(req, res) =>{
  try {
    const posts = await BlogPost.find({published: true}).sort({ createdAt: -1});
    return res.json(posts);
  } catch(error){
    res.status(500).json({message: 'Failed to fetch Blog Post', error: error.message});
  }
});

// 3. PUBLIC: Get single blog post by slug
router.get('/:slug', async(req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true});
    if(!post) {
      return res.status(404).json({ message: 'Blog post not found'});
    }
   return res.json(post);
  } catch(error){
    res.status(500).json({ message: 'Failed to fetch blog post', error: error.message});
  }
});

// 4. ADMIN: Create a blog post
router.post('/', verifyAdmin, async(req , res) => {
  try {
    const newPost = new BlogPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch(error){
    res.status(400).json({ message: 'Failed to create blog post', error: error.message});
  }
});

// 5. ADMIN: Update a blog post
router.patch('/:id', verifyAdmin, async(req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true}
    );
    if(!updatedPost){
      return res.status(404).json({ message: 'Blog post not found'});
    } 
    return res.json(updatedPost);
  } catch(error){
    res.status(400).json({ message: 'Failed to Update Blog Post', error: error.message});
  }
});

// 6. ADMIN: Delete the blog post
router.delete('/:id', verifyAdmin, async(req, res) => {
  try{
  const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);

  if(!deletedPost) {
   return res.status(404).json({ message: 'Blog post not found'});
  }
  return res.json({ message: 'Blog post deleted successfully'});
} catch(error){
  res.status(500).json({ message: 'Failed to delete the Blog Post', error: error.message});
}
});

module.exports = router;