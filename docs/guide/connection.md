## How to connect ?

You can you import `MongoDbConnection` class from the package and you will be able to use `connect()` method, as you can see the following example:

```typescript
import express from 'express';
import dotenv from 'dotenv';
import { MongoDbConnection } from 'mongodb-atlas-sdk';
dotenv.config();

const connectMongo = new MongoDbConnection(process.env.DB_URI!);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  connectMongo.connect();
});
```

## How to reconnect ?

The `MongoDbConnection` class includes a reconnect logic that attempts to reconnect to MongoDB if the connection is lost. You can configure the maximum number of `retries` and the `interval` between `retries` when creating an instance of `MongoDbConnection`.

```typescript
import express from 'express';
import dotenv from 'dotenv';
import { MongoDbConnection } from 'mongodb-atlas-sdk';
dotenv.config();

const mongoKit = new MongoDbConnection(process.env.DB_URI!, {}, 5, 5000); // maxRetries = 5, retryInterval = 5000ms

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  mongoKit.connect();
});
```

- `uri: string` The MongoDB connection URI.

- `options?:` ConnectOptions Additional connection options for Mongoose.

- `maxRetries:` number The maximum number of retry attempts for reconnecting. Default is 5.

- `retryInterval:` number The interval (in milliseconds) between retry attempts. Default is 5000ms (5 seconds).
