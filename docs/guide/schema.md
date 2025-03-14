## Creating model with mongoose with zod validation

You can create a database model with mongoose or you can aslo used zod to validate your data with the `SchemaValidator` class which is built on top of zod. Let's see how to create a user model with mongoose and validate the data using zod.

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

You can check our example project on [Github](https://github.com/shivarm/mongodb-atlas-sdk/tree/main/examples/typescript) for better understanding.
