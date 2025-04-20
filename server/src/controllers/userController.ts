import User from '../models/User.js';
import { Request, Response } from 'express';

// get all users 
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// get one user by id 
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

        if (!user) {
            res.status(404).json({ message: 'User not found with that ID' });
        } else {
            res.json(user);
        } 
    } catch (error) {
        res.status(500).json(error);
    }
}

// create a new user 
export const createUser = async (req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await new User(req.body).save();
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};  

// delete user 
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that ID' });
        }
        res.json(dbUserData);   
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
} 



