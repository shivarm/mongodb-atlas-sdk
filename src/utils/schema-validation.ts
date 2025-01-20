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
