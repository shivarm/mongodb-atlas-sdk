import express from 'express';
const router = express.Router();

import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  backupUser,
} from '../controllers/userController';

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.post('/backup', backupUser);

export default router;
