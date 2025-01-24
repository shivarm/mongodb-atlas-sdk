## Connection Pool Guide

Connection pool is a mechanism used to manage a pool of connections to a database. It is a common pattern in web applications to use a connection pool to manage database connections. This is because creating a new connection to a database is an expensive operation. Connection pool helps to reduce the overhead of creating new connections by reusing existing connections.

```typescript
import express from 'express';
import dotenv from 'dotenv';
import { MongoDbConnection } from 'mongodb-atlas-sdk';

dotenv.config();

const mongoOptions = {
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 2, // Minimum number of connections in the pool
  maxIdleTimeMS: 30000, // Maximum idle time for a connection in the pool
};

const mongoKit = new MongoDbConnection(process.env.DB_URI!, mongoOptions);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));

app.listen(PORT, async () => {
  console.log('Server is running on http://localhost:' + PORT);
  await mongoKit.connect();
});
```
