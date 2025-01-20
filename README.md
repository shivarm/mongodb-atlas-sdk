<div align="center">

<img src="./assets/mongo-sm.png" alt="">

<a href="https://github.com/shivarm/mongodb-atlas-sdk/actions/workflows/ci.yml"><img alt="Node.js CI" src="https://github.com/shivarm/mongodb-atlas-sdk/actions/workflows/ci.yml/badge.svg"></a>
<a href="https://www.npmjs.com/package/mongodb-atlas-sdk"><img alt="npm version" src="https://img.shields.io/npm/v/mongodb-atlas-sdk"></a>
<a href="https://github.com/shivarm/mongodb-atlas-sdk/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/shivarm/mongodb-atlas-sdk"></a>

</div>

**mongodb-atlas-sdk** is a modern, TypeScript-based SDK designed to simplify and supercharge your interaction with MongoDB Atlas. Built with scalability, ease of use, and extensibility in mind, mongodb-atlas-sdk is the perfect solution for developers who need a flexible and robust tool to handle their database operations.

## Why mongodb-atlas-sdk?

Unlike other MongoDB SDKs, MongoKit focuses on developer productivity, scalability, and modern application needs. Whether you’re building a high-performance REST API, a real-time app, or a distributed system, mongodb-atlas-sdk is here to empower your database operations.

## Key Features

- Easy MongoDB Atlas Connection: Establish secure and reliable connections with MongoDB Atlas using simple configuration.
- Schema Validation: Ensure data integrity with JSON schema validation powered by Zod.
- TypeScript-First: Enjoy fully typed APIs for improved developer experience and better code quality.

## Installation

Install mongokit using npm, pnpm or yarn:

```bash
npm install mongodb-atlas-sdk

pnpm add mongodb-atlas-sdk

yarn add mongodb-atlas-sdk
```

> [!IMPORTANT]
> You can check Node.js/Express.js example [Application](./examples)

## Usage

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

## Methods

- `connect(): Promise<void>`
  Connects to the MongoDB server.

- `getDatabase(name: string): Db`
  Returns a database instance for the given name.

- `disconnect(): Promise<void>`
  Disconnects from the MongoDB server.

## Custom Schema

You can create your custom schemas with Zod.

```typescript
import { z } from 'zod';
import { SchemaValidator } from 'mongodb-atlas-sdk';

// Define a custom schema
const productSchema = z.object({
  id: z.string().uuid('Invalid product ID'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be non-negative'),
});

// Create a validator for the custom schema
const productValidator = new SchemaValidator(productSchema);

// Example data to validate
const productData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Example Product',
  price: 19.99,
};

try {
  // Validate the data
  const validatedProduct = productValidator.validate(productData);
  console.log('Validated product:', validatedProduct);
} catch (error) {
  console.error('Validation error:', error.message);
}
```

## Development

See our [Contributing Guide](./CONTRIBUTING.md).

## Support

- Give a ⭐️ if this project helped you!
- You can also sponsor me on [Github](https://github.com/sponsors/shivarm)
