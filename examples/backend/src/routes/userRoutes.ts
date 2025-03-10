import express from 'express';
const router = express.Router();

import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/userController';

import { backupUser, backupUserToDB } from '../controllers/backupController';

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.post('/backup', backupUser);
router.post('/backup-to-db', backupUserToDB);

export default router;
