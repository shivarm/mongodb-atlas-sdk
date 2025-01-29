import { Request, Response } from 'express';
import { User } from '../model/userModel';
import { Backup } from 'mongodb-atlas-sdk';

const backup = new Backup();

export const backupUser = async (req: Request, res: Response) => {
  try {
    const filePath = req.body.filePath;
    await backup.backupModel(User, filePath);
    res.status(200).json({ message: 'Backup completed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to backup data' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ err: 'User not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send({ err: 'User not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ err: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
