<div align="center">

<img src="./docs/mongodb.png" alt="">
 <span>
    <h1>mongodb-atlas-sdk</h1>
</span>

<a href="https://github.com/shivarm/mongodb-atlas-sdk/actions/workflows/ci.yml"><img alt="Node.js CI" src="https://github.com/shivarm/mongodb-atlas-sdk/actions/workflows/ci.yml/badge.svg"></a>
<a href="https://www.npmjs.com/package/mongodb-atlas-sdk"><img alt="npm version" src="https://img.shields.io/npm/v/mongodb-atlas-sdk"></a>
<a href="./LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/shivarm/mongodb-atlas-sdk"></a>
<a href="https://github.com/shivarm/mongodb-atlas-sdk/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/shivarm/mongodb-atlas-sdk"></a>

</div>

## Why mongodb-atlas-sdk?

Unlike other MongoDB SDKs, `mongodb-atlas-sdk` focuses on developer productivity, scalability, and modern application needs. Whether you’re building a high-performance REST API, a real-time app, data backup or a distributed system, `mongodb-atlas-sdk` is here to empower your database operations.

## Table of Contents

- [Installation](#installation)
- [Example](#example)
- [Documentation](#documentation)
- [Development](#development)
- [Support](#support)

## Installation

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

## Example

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

## Documentation

- [Getting Started](https://shivarm.github.io/mongodb-atlas-sdk/#/./guide/installation)
- [Connect to MongoDB Atlas](https://shivarm.github.io/mongodb-atlas-sdk/#/./guide/connection)
- [Create Schema and Model](https://shivarm.github.io/mongodb-atlas-sdk/#/./guide/schema)
- [Connection Pooling](https://shivarm.github.io/mongodb-atlas-sdk/#/./guide/connection-pool)
- [Query Caching](https://shivarm.github.io/mongodb-atlas-sdk/#/./guide/queryCaching)
- [Audit Logging](https://shivarm.github.io/mongodb-atlas-sdk/#/./guide/auditLogging)
- [Backup and Restore](https://shivarm.github.io/mongodb-atlas-sdk/#/./guide/backup)

and many more feature check [Docs](https://shivarm.github.io/mongodb-atlas-sdk/#/./home)

## Development

Whether reporting bugs, discussing improvements and new ideas or writing code, we welcome contributions from anyone and everyone. Please check our [Contributing Guide](./CONTRIBUTING.md).

## Support

- Give a ⭐️ if this project helped you!
- You can also sponsor me on [Github](https://github.com/sponsors/shivarm)
