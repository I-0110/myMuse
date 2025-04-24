import { Post, User } from '../models/index.js'; 
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
        } 

        res.json(post);
        return;
        
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
            res.status(404).json({ message: 'Post created, but found no user with that ID' });
        }   

        res.json('Created the post 🎉');
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post' });
    }

    return;
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: req.params.postId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!post) {
            return res.status(404).json({ message: 'Post not found with this id!' });
        } 
        res.json('Updated the post 🎉');
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating post' });
        return;
    }
}

// Delete a post 
export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.postId }); 

        if (!post) {
            return res.status(404).json({ message: 'Post no found with that id!' });
         }  

        const user = await User.findOneAndUpdate(
            { posts: req.params.postId },
            { $pull: { posts: req.params.postId } }, 
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'Post deleted, but no user found with that id!' });
        }

        res.json('Deleted the post 🎉');
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting post' });
        }

        return;
};

// Add a post response
export const addPostResponse = async (req: Request, res: Response) => {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $addToSet: { responses: req.body } },
        { runValidators: true, new: true }
      );

      if (!post) {
        return res.status(404).json({ message: 'No post found with this id!' });
      }

      res.json(post);
      return;
    } catch (error) {
      res.status(500).json(error);
      return;
    }
  }

  // Remove post response
  export const removePostResponse = async (req: Request, res: Response) => {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { reactions: { responseId: req.params.responseId } } },
        { runValidators: true, new: true }
      )

      if (!post) {
        return res.status(404).json({ message: 'No post found with this id!' });
      }

      res.json(post);
      return;
    } catch (error) {
      res.status(500).json(error);
      return;
    }
  }




