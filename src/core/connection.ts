import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from '../logger.js';
import ora, { Ora } from 'ora';

export class MongoDbConnection {
  private uri: string;
  private options?: ConnectOptions;
  private maxRetries: number;
  private retryInterval: number;
  private spinner: Ora;

  constructor(uri: string, options?: ConnectOptions, mazRetries = 5, retryInterval = 5000) {
    this.uri = uri;
    this.options = options;
    this.maxRetries = mazRetries;
    this.retryInterval = retryInterval;
    this.spinner = ora();
  }

  async connect(): Promise<void> {
    this.spinner.start('Connecting to MongoDB Atlas');
    try {
      await mongoose.connect(this.uri, {
        ...this.options,
        serverSelectionTimeoutMS: 30000,
      });

      logger.info('Connected to MongoDB Atlas');
    } catch (error) {
      logger.error('Error connection to MongoDB Atlas', error);
      this.reconnect();
    }

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB connection lost. Attempting to reconnect...');
      this.reconnect();
    });
  }

  async disconnect(): Promise<void> {
    this.spinner.start('Disconnecting from MongoDB Atlas');
    try {
      await mongoose.disconnect();
      logger.info('Disconnected from MongoDB Atlas');
    } catch (error) {
      logger.error('Error disconnecting from MongoDB Atlas:', error);
    }
  }

  private async reconnect(attempt = 1): Promise<void> {
    if (attempt > this.maxRetries) {
      logger.error('Max reconnect attempts reached. Could not reconnect to MongoDB Atlas.');
      return;
    }
    this.spinner.start('Reconnecting to MongoDB Atlas');
    try {
      await new Promise((resolve) => setTimeout(resolve, this.retryInterval));
      await mongoose.connect(this.uri, {
        ...this.options,
        serverSelectionTimeoutMS: 30000,
      });
      logger.info('Reconnected to MongoDB Atlas');
    } catch (error) {
      logger.error(`Reconnect attempt ${attempt} failed. Retrying in ${this.retryInterval / 1000} seconds...`, error);
      this.reconnect(attempt + 1);
    }
  }
}
