## Custom Schema

You can create your custom schema with zod and validate your data with the `SchemaValidator` class.

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

## Creating model with mongoose with zod validation

You can create a model with mongoose and validate your data with the `SchemaValidator` class which is built on top of zod.

- 1 Create a file `src/schema-validation.ts` and define your user schema using Zod:

```typescript
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(0, 'Age must be non-negative'),
});
```

- 2 Create a file `user-model.ts` and define your user model using mongoose:

```typescript
import mongoose, { Schema, Document } from 'mongoose';
import { SchemaValidator } from 'mongodb-atlas-sdk';
import { userSchema } from 'src/schema-validation';

// Define the IUser interface
export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

// Create a validator for the user schema
const userValidator = new SchemaValidator(userSchema);

// Define the Mongoose schema
const mongooseUserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 0 },
});

// Pre-save hook to validate using Zod schema
mongooseUserSchema.pre('save', function (next) {
  try {
    userValidator.validate(this.toObject());
    next();
  } catch (error) {
    next(new Error(`Validation error: ${(error as Error).message}`));
  }
});

// Create the Mongoose model
export const User = mongoose.model<IUser>('User', mongooseUserSchema);
```
