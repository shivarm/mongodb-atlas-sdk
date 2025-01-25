import { z, ZodSchema } from 'zod';
import ora, { Ora } from 'ora';
import { logger } from '../logger.js';

export class SchemaValidator {
  private schema: ZodSchema;
  private spinner: Ora;

  constructor(schema: ZodSchema) {
    this.schema = schema;
    this.spinner = ora();
  }

  validate<T>(data: unknown): T {
    this.spinner.start('Validating data...');
    try {
      const result = this.schema.parse(data);
      logger.info('Data validation successful');
      return result;
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
