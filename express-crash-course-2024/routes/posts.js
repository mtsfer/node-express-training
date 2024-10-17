import express from 'express';
import {getAllPosts, getPost, createPost, updatePost, deletePost} from '../controllers/post-controller.js';

const router = express.Router();

// Get all posts
router.get('/', getAllPosts);

// Get single post
router.get('/:id', getPost);

// Create new post
router.post('/', createPost);

// Update a post
router.put('/:id', updatePost);

// Delete a post
router.delete('/:id', deletePost);

export default router;
