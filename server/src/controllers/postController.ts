import { Post, User } from '../models';
import { Request, Response } from 'express';

// Get all posts
export const getPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

// Get one post 
export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId });

        if (!post) {
            res.status(404).json({ message: 'Post not found with that ID' });
        } else {
            res.json(post);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post' });
    }
}

// Create a new post
export const createPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { posts: post._id } },
            { new: true }
        );

        if (!user) { 
            res
            .status(404)
            .json({ message: 'Post created, but found no user with that ID' });
        } else {
            res.json('Created the post 🎉');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post' });
    }
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { posts: post._id } },
            { new: true }
        );

        if (!user) {
            res
                .status(404)
                .json({ message: 'Post created, but found no user with that ID' });
        } else {
            res.json('Updated the post 🎉');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating post' });
    }
}

// Delete a post 
export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.deleteOne(req.body);
        const user = await User.findOneAndDelete(
            { _id: req.body.userId },
            { posts: (post) }
        );

        if (!user) {
            res
             .status(404)
             .json({ message: 'Post created, but found no user with that ID' });
         } else {  
           res.json('Deleted the post 🎉');
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting post' });
        }
};



