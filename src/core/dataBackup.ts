import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../logger.ts';

export class Backup {
  async backupModel(model: mongoose.Model<any>, filePath: string): Promise<void> {
    try {
      const directory = path.dirname(filePath);
      await fs.mkdir(directory, { recursive: true });
      const collectionName = model.collection.name;
      // Retrieve all documents as plain objects
      const data = await model.find({}).lean().exec();
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      logger.info(`Backup of collection ${collectionName} completed successfully.`);
    } catch (error) {
      logger.error(`Failed to backup collection ${model.collection.name}: ${error}`);
      throw error;
    }
  }

  async restoreModel(model: mongoose.Model<any>, filePath: string): Promise<void> {
    try {
      const collectionName = model.collection.name;
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      await model.insertMany(data);
      logger.info(`Restore of collection ${collectionName} completed successfully.`);
    } catch (error) {
      logger.error(`Failed to restore collection ${model.collection.name}: ${error}`);
      throw error;
    }
  }
}
