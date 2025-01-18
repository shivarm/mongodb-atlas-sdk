import { z, ZodSchema } from 'zod';

export class SchemaValidator {
  private schema: ZodSchema;

  constructor(schema: ZodSchema) {
    this.schema = schema;
  }

  validate<T>(data: unknown): T {
    try {
      return this.schema.parse(data);
    } catch (error) {
      throw new Error(`Validation error: ${(error as Error).message}`);
    }
  }
}

// Example Schema
export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(0, 'Age must be non-negative'),
});

export const userValidator = new SchemaValidator(userSchema);
