import { Request, Response } from 'express';
import { Backup } from 'mongodb-atlas-sdk';
import { User } from '../model/userModel';
import { BackupModel } from '../model/backupModel';

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

export const backupUserToDB = async (req: Request, res: Response) => {
  try {
    await backup.backupToDB(User, BackupModel);
    res.status(200).json({ message: 'Backup completed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to backup data' });
  }
};
