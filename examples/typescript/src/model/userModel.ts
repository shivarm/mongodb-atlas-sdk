import mongoose, { Schema, Document } from 'mongoose';
import { SchemaValidator } from 'mongodb-atlas-sdk';
import { userSchema } from '../schema-validation';

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
