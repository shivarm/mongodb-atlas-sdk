import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from '../logger.js';

export class MongoDbConnection {
  private uri: string;
  private options?: ConnectOptions;

  constructor(uri: string, options?: ConnectOptions) {
    this.uri = uri;
    this.options = options;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri, {
        ...this.options,
        serverSelectionTimeoutMS: 30000,
      });

      logger.info('Connected to MongoDB Atlas');
    } catch (error) {
      logger.error('Error connection to MongoDB Atlas', error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('Disconnected from MongoDB Atlas');
    } catch (error) {
      logger.error('Error disconnecting from MongoDB Atlas:', error);
    }
  }
}
