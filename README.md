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

## Usage

```typescript
import { MongoDbConnection } from 'mongodb-atlas-sdk';

const mongoConnect = new MongoDbConnection('your-mongodb-uri');

async function main() {
  await mongoConnect.connect();

  const db = mongoConnect.getDatabase('my-database');
  console.log('Database connected:', db.databaseName);

  await mongoConnect.disconnect();
}

main().catch(console.error);
```

## Methods

- `connect(): Promise<void>`
  Connects to the MongoDB server.

- `getDatabase(name: string): Db`
  Returns a database instance for the given name.

- `disconnect(): Promise<void>`
  Disconnects from the MongoDB server.

## Custom Schema

You can create custom schemas with Zod.

```typescript
import { z, SchemaValidator } from 'mongodb-atlas-sdk';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be non-negative'),
});

const productValidator = new SchemaValidator(productSchema);

const product = { name: 'Laptop', price: 999 };

try {
  const validatedProduct = productValidator.validate(product);
  console.log('Validated product:', validatedProduct);
} catch (error) {
  console.error('Validation failed:', error.message);
}
```

## Development

See our [Contributing Guide](./CONTRIBUTING.md).

## Support

- Give a ⭐️ if this project helped you!
- You can also sponsor me on [Github](https://github.com/sponsors/shivarm)
