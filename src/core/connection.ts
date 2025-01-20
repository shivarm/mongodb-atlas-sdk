import { MongoClient, Db } from 'mongodb';

export class MongoDbConnection {
  private client: MongoClient;
  private database: Map<string, Db>;
  private isConnected: boolean;

  constructor(private uri: string) {
    this.client = new MongoClient(uri);
    this.database = new Map();
    this.isConnected = false;
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.isConnected = true;
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.log('Error connection to MongoDB Atlas', error);
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
      console.log('Disconnected from MongoDB Atlas');
    } catch (error) {
      console.error('Error disconnecting from MongoDB Atlas:', error);
    }
  }

  async reconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log('Reconnection to MongoDB Atlas...');
    }
  }
}
