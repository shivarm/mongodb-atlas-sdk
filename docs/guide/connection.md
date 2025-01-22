## How to connect ?

You can you import `MongoDbConnection` class from the package and you will be able to use `connect()` method, as you can see the following example:

```javascript
import express from 'express';
import dotenv from 'dotenv';
import { MongoDbConnection } from 'mongodb-atlas-sdk';
dotenv.config();

const mongoKit = new MongoDbConnection(process.env.DB_URI!);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  mongoKit.connect();
});
```

**Note:** You can also use the following methods as per your requirement.

## Methods

- `connect(): Promise<void>`
  Connects to the MongoDB server.

- `reconnect(): Promise<void>`
  Reconnect if the connection is lost.

- `getDatabase(name: string): Db`
  Returns a database instance for the given name.

- `disconnect(): Promise<void>`
  Disconnects from the MongoDB server.
