import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { logger } from '../logger.js';
import ora from 'ora';

export class MongoDbConnection {
  private client: MongoClient;
  private database: Map<string, Db>;
  private isConnected: boolean;

  constructor(
    private uri: string,
    private options?: MongoClientOptions,
  ) {
    this.client = new MongoClient(uri, options);
    this.database = new Map();
    this.isConnected = false;
  }

  async connect(): Promise<void> {
    const spinner = ora('Connecting to MongoDB Atlas..').start();
    try {
      await this.client.connect();
      this.isConnected = true;
      spinner.stop();
      logger.info('Connected to MongoDB Atlas');
    } catch (error) {
      logger.error('Error connection to MongoDB Atlas', error);
      this.isConnected = false;
    }
  }

  getDatabaseName(name: string): Db {
    if (!this.database.has(name)) {
      const db = this.client.db(name);
      this.database.set(name, db);
    }
    return this.database.get(name) as Db;
  }

  async disconnect(): Promise<void> {
    const spinner = ora('Disconnecting to MongoDB Atlas..').start();
    try {
      await this.client.close();
      this.isConnected = false;
      spinner.stop();
      logger.info('Disconnected from MongoDB Atlas');
    } catch (error) {
      logger.error('Error disconnecting from MongoDB Atlas:', error);
    }
  }

  async reconnect(): Promise<void> {
    const spinner = ora('Reconnecting to MongoDB Atlas..').start();
    if (!this.isConnected) {
      spinner.stop();
      logger.info('Reconnection to MongoDB Atlas...');
    }
  }
}
