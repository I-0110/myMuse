import { Router } from 'express';
import { getSinglePost, getPosts, createPost, updatePost, deletePost } from '../../controllers/postController.js';

const router = Router();

router.route('/').get(getPosts).post(createPost).put(updatePost).delete(deletePost);

router.route('/:postId').get(getSinglePost)

export default router;