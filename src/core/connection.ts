import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { logger } from '../logger.js';

export class MongoDbConnection {
  private client: MongoClient;
  private database: Map<string, Db>;
  private isConnected: boolean;

  constructor(
    private uri: string,
    private options?: MongoClientOptions,
  ) {
    this.client = new MongoClient(uri, { ...options, serverSelectionTimeoutMS: 300000 });
    this.database = new Map();
    this.isConnected = false;
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.isConnected = true;
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
    try {
      await this.client.close();
      this.isConnected = false;
      logger.info('Disconnected from MongoDB Atlas');
    } catch (error) {
      logger.error('Error disconnecting from MongoDB Atlas:', error);
    }
  }

  async reconnect(): Promise<void> {
    if (!this.isConnected) {
      logger.info('Reconnection to MongoDB Atlas...');
    }
  }
}
