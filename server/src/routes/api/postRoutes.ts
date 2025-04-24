import { Router } from 'express';
import { getPosts, getSinglePost, createPost, updatePost, deletePost, addPostResponse, removePostResponse } from '../../controllers/postController.js'; 

const router = Router();

// api/posts 
router.route('/').get(getPosts).post(createPost);

// /api/posts/:postId
router
    .route('/:postId')
    .get(getSinglePost)
    .put(updatePost)
    .delete(deletePost);

// /api/posts/:postId/responses
router.route('/:postId/responses').post(addPostResponse);

// /api/posts/:postId/responses/:responseId
router.route('/:postId/responses/:responseId').delete(removePostResponse);

export default router;