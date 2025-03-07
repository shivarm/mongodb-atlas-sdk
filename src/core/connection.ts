import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from '../logger.js';

export class MongoDbConnection {
  private uri: string;
  private options?: ConnectOptions;
  private maxRetries: number;
  private retryInterval: number;

  constructor(uri: string, options?: ConnectOptions, mazRetries = 5, retryInterval = 5000) {
    this.uri = uri;
    this.options = options;
    this.maxRetries = mazRetries;
    this.retryInterval = retryInterval;

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB connection lost. Attempting to reconnect...');
      this.reconnect();
    });
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri, {
        ...this.options,
        serverSelectionTimeoutMS: 30000,
      });

      logger.info('Connected to MongoDB Atlas');
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Error connecting to MongoDB Atlas:', error.message);
        throw new Error(`Error connecting to MongoDB Atlas: ${error.message}`);
      }
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('Disconnected from MongoDB Atlas');
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Error disconnecting from MongoDB Atlas:', error.message);
        throw new Error(`Error disconnecting from MongoDB Atlas: ${error.message}`);
      }
    }
  }

  private async reconnect(attempt = 1): Promise<void> {
    if (attempt > this.maxRetries) {
      logger.error('Max reconnect attempts reached. Could not reconnect to MongoDB Atlas.');
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, this.retryInterval));
      await mongoose.connect(this.uri, {
        ...this.options,
        serverSelectionTimeoutMS: 30000,
      });
      logger.info('Reconnected to MongoDB Atlas');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Reconnect attempt ${attempt} failed: ${error.message}`);
        this.reconnect(attempt + 1);
      }
    }
  }
}
