## How to use with Javascript ?

You can you import `MongoDbConnection` class from the package and you will be able to use `connect()` method, as you can see the following example:

```javascript
import express from 'express';
import dotenv from 'dotenv';
import { MongoDbConnection } from 'mongodb-atlas-sdk';

dotenv.config();

const mongoKit = new MongoDbConnection(process.env.DB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  mongoKit.connect();
});
```
