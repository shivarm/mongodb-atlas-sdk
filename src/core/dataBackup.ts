import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'node:path';
import { logger } from '../logger.ts';

interface BackupOptions {
  fields?: string[];
}

export class Backup {
  async backupModel(model: mongoose.Model<any>, filePath: string, options: BackupOptions = {}): Promise<void> {
    try {
      const { fields } = options;
      const directory = path.dirname(filePath);
      await fs.mkdir(directory, { recursive: true });
      const collectionName = model.collection.name;

      // Retrieve all documents as plain objects and specified fields
      const projection = fields ? fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}) : {};
      const data = await model.find({}, projection).lean().exec();
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      logger.info(`Backup of collection ${collectionName} completed successfully.`);
    } catch (error) {
      logger.error(`Failed to backup collection ${model.collection.name}: ${error}`);
      throw error;
    }
  }

  async backupToDB(
    model: mongoose.Model<any>,
    backupModel: mongoose.Model<any>,
    options: BackupOptions = {},
  ): Promise<void> {
    try {
      const { fields } = options;
      const collection = model.collection.name;

      const projection = fields ? fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}) : {};
      const data = await model.find({}, projection).lean().exec();

      for (let doc of data) {
        const backup = new backupModel({ collection, data: doc });
        await backup.save();
      }
      logger.info(`Backup of collection ${collection} to database completed successfully.`);
    } catch (error) {
      logger.error(`Failed to backup collection ${backupModel.collection.name} to database: ${error}`);
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
