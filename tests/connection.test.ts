import { MongoDbConnection } from '../src/core/connection';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import 'dotenv/config';

const URI = process.env.DB_URI;

if (!URI) {
  throw new Error(`${URI} is not defined'`);
}

describe('MongoDbConnection', () => {
  let mongoDbConnect: MongoDbConnection;

  beforeAll(async () => {
    mongoDbConnect = new MongoDbConnection(URI);
    await mongoDbConnect.connect();
  }, 30000);

  afterAll(async () => {
    await mongoDbConnect.disconnect();
  });

  it('should connect to MongoDB Atlas', async () => {
    expect(mongoDbConnect).toBeDefined();
  });

  it('should get a database instance', async () => {
    const db = mongoDbConnect.getDatabaseName('test-db');
    expect(db).toBeTruthy();
  });
});
