## Getting Started

Hello! Thank you for checking out **mongodb-atlas-sdk**!

Let's start by installing mongodb-atlas-sdk. You can install it with the following any package manager.

```bash
npm install mongodb-atlas-sdk
```

```bash
pnpm add mongodb-atlas-sdk
```

```bash
yarn add mongodb-atlas-sdk
```

## Express Application

```typescript
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

Congratulations! You have successfully installed **mongodb-atlas-sdk**.
