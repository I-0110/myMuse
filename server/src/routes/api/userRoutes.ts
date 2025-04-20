import { Router } from 'express';
import { getUsers, getSingleUser, createUser, updateUser, deleteUser } from '../../controllers/userController.js'; 

const router = Router();

// api/users
router.route('/').get(getUsers).post(createUser).delete(deleteUser).put(updateUser);

// /api/users/:userId 
router.route('/:userId').get(getSingleUser).post(updateUser).put(updateUser).delete(deleteUser);    

export default router; 
