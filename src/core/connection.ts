import { MongoClient, Db } from 'mongodb';

export class MongoDbConnection {
  private client: MongoClient;
  private database: Map<string, Db>;

  constructor(private uri: string) {
    this.client = new MongoClient(uri);
    this.database = new Map();
  }

  async connect(): Promise<void> {
    await this.client.connect();
    console.log('Connected to MongoDB Atlas');
  }

  getDatabaseName(name: string): Db {
    if (!this.database.has(name)) {
      const db = this.client.db(name);
      this.database.set(name, db);
    }
    return this.database.get(name) as Db;
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    console.log('Disconnected from MongoDB Atlas');
  }
}
