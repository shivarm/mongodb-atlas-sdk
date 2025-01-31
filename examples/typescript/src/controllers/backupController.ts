import { Request, Response } from 'express';
import { Backup } from 'mongodb-atlas-sdk';
import { User } from '../model/userModel';

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
